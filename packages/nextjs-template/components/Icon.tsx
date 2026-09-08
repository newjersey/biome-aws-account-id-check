/**
 * Renders a decorative icon from Grove's USWDS sprite.
 */

const ICON_SPRITE_PATH = "/assets/grove/dist/img/sprite.svg";

/**
 * Names the Grove icons used by the template.
 */
export type IconName = "close" | "mail";

/**
 * Describes a decorative Grove icon.
 */
export interface IconProps {
  /** Additional presentation classes applied after the Grove icon class. */
  readonly className?: string;
  /** Sprite symbol rendered by the icon. */
  readonly name: IconName;
}

/**
 * Renders a decorative Grove sprite icon.
 *
 * @param props Icon input.
 * @returns The decorative icon.
 */
export const Icon = ({ className, name }: IconProps) => {
  const iconClassName = className ? `usa-icon ${className}` : "usa-icon";

  return (
    <svg aria-hidden="true" className={iconClassName} focusable="false">
      <use href={`${ICON_SPRITE_PATH}#${name}`} />
    </svg>
  );
};
