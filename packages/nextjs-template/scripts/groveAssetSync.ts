import { cp, mkdir, rename, rm, stat } from "node:fs/promises";
import path from "node:path";

/**
 * Describes one required file in the installed Grove distribution.
 */
export interface RequiredGroveAsset {
  /** Relative path inside the Grove distribution directory. */
  readonly relativePath: string;
  /** Human-readable purpose included in validation errors. */
  readonly description: string;
}

/**
 * Writes a structured informational script message.
 */
export type LogInfo = (params: LogInfoParams) => void;

/**
 * Describes input for an informational log entry.
 */
export interface LogInfoParams {
  /** Message written by the script. */
  readonly message: string;
}

/**
 * Describes the logger dependency used by the asset synchronization operation.
 */
export interface GroveAssetLogger {
  /** Writes normal operation progress. */
  readonly info: LogInfo;
}

/**
 * Describes input for synchronizing Grove assets.
 */
export interface SyncGroveAssetsParams {
  /** Installed Grove distribution directory. */
  readonly sourceDirectory: string;
  /** Public directory that receives the synchronized distribution. */
  readonly targetDirectory: string;
  /** Files that must exist before the public directory is replaced. */
  readonly requiredAssets: readonly RequiredGroveAsset[];
  /** Logger used for completion output. */
  readonly logger: GroveAssetLogger;
}

/**
 * Resolves one installed package path through Node.js module resolution.
 */
export type ResolvePackagePath = (specifier: string) => string;

/**
 * Describes input for locating the installed Grove distribution.
 */
export interface ResolveGroveDistributionDirectoryParams {
  /** Resolver scoped to the application package. */
  readonly resolvePackagePath: ResolvePackagePath;
}

/**
 * Describes input for validating one filesystem path.
 */
interface ValidatePathExistsParams {
  /** Filesystem path that must exist. */
  readonly filePath: string;
  /** Human-readable purpose included in validation errors. */
  readonly description: string;
}

/**
 * Describes input for replacing a public asset directory.
 */
interface ReplaceDirectoryParams {
  /** Complete source directory to copy or move. */
  readonly sourceDirectory: string;
  /** Public directory replaced by the operation. */
  readonly targetDirectory: string;
}

/**
 * Describes input for restoring a target after replacement fails.
 */
interface RestoreTargetParams {
  /** Previous target directory retained for rollback. */
  readonly backupDirectory: string;
  /** Public directory to restore. */
  readonly targetDirectory: string;
  /** Error raised while moving the prepared directory. */
  readonly replacementError: unknown;
}

/**
 * Validates that a required filesystem path exists.
 *
 * @param params Validation input.
 * @param params.filePath Path that must exist.
 * @param params.description Human-readable path purpose.
 * @returns A promise that resolves when the path exists.
 */
const validatePathExists = async ({
  filePath,
  description,
}: ValidatePathExistsParams): Promise<void> => {
  try {
    await stat(filePath);
  } catch (error) {
    throw new Error(`Missing ${description} at ${filePath}`, { cause: error });
  }
};

/**
 * Locates Grove's distribution from the installed package rather than a node_modules layout.
 *
 * @param params Resolution input.
 * @returns Absolute path to the installed Grove distribution directory.
 */
export const resolveGroveDistributionDirectory = ({
  resolvePackagePath,
}: ResolveGroveDistributionDirectoryParams): string => {
  const packageJsonPath = resolvePackagePath("@newjersey/njwds/package.json");
  return path.join(path.dirname(packageJsonPath), "dist");
};

/**
 * Validates every required file before replacing public assets.
 *
 * @param params Synchronization input.
 * @returns A promise that resolves when every required asset exists.
 */
const validateRequiredAssets = async ({
  sourceDirectory,
  requiredAssets,
}: SyncGroveAssetsParams): Promise<void> => {
  const validationPromises = requiredAssets.map((asset) => {
    return validatePathExists({
      filePath: path.join(sourceDirectory, asset.relativePath),
      description: asset.description,
    });
  });

  await Promise.all(validationPromises);
};

/**
 * Returns whether a filesystem path exists.
 *
 * @param filePath Filesystem path to inspect.
 * @returns Whether the path exists.
 */
const pathExists = async (filePath: string): Promise<boolean> => {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
};

/**
 * Restores the previous target after a prepared-directory move fails.
 *
 * @param params Restoration input.
 * @returns A promise that rejects with the replacement error or both failures.
 */
const restoreTarget = async ({
  backupDirectory,
  targetDirectory,
  replacementError,
}: RestoreTargetParams): Promise<never> => {
  try {
    await rename(backupDirectory, targetDirectory);
  } catch (restorationError) {
    const replacementDetails =
      replacementError instanceof Error
        ? (replacementError.stack ?? replacementError.message)
        : String(replacementError);

    throw new Error(
      `Failed to replace ${targetDirectory} and restore its previous contents. Replacement failure: ${replacementDetails}`,
      { cause: restorationError },
    );
  }

  throw replacementError;
};

/**
 * Copies the installed distribution before replacing public assets with rollback support.
 *
 * @param params Directory replacement input.
 * @returns A promise that resolves after the public directory has been replaced.
 */
const replaceDirectory = async ({
  sourceDirectory,
  targetDirectory,
}: ReplaceDirectoryParams): Promise<void> => {
  const targetParentDirectory = path.dirname(targetDirectory);
  const temporaryDirectory = path.join(
    targetParentDirectory,
    `.grove-${process.pid}-${Date.now()}`,
  );
  const backupDirectory = `${temporaryDirectory}-backup`;
  let targetWasMoved = false;

  try {
    await mkdir(targetParentDirectory, { recursive: true });
    await cp(sourceDirectory, temporaryDirectory, { recursive: true });
    await rm(backupDirectory, { force: true, recursive: true });

    if (await pathExists(targetDirectory)) {
      await rename(targetDirectory, backupDirectory);
      targetWasMoved = true;
    }

    try {
      await rename(temporaryDirectory, targetDirectory);
    } catch (error) {
      if (targetWasMoved) {
        await restoreTarget({
          backupDirectory,
          targetDirectory,
          replacementError: error,
        });
      }

      throw error;
    }

    await rm(backupDirectory, { force: true, recursive: true });
  } catch (error) {
    await rm(temporaryDirectory, { force: true, recursive: true });
    throw error;
  }
};

/**
 * Validates and synchronizes Grove's compiled distribution into public assets.
 *
 * @param params Synchronization input.
 * @returns A promise that resolves after synchronization completes.
 */
export const syncGroveAssets = async (params: SyncGroveAssetsParams): Promise<void> => {
  await validatePathExists({
    filePath: params.sourceDirectory,
    description: "Grove distribution directory",
  });
  await validateRequiredAssets(params);
  await replaceDirectory(params);
  params.logger.info({ message: `Synchronized Grove assets to ${params.targetDirectory}` });
};
