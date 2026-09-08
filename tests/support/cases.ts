import type { PluginLanguage } from "./runBiome.ts";

/** One fixture file and the number of plugin diagnostics it should produce. */
export interface FixtureCase {
  readonly name: string;
  readonly fileName: string;
  readonly content: string;
  readonly expectedMatchCount: number;
}

const javascriptCases: readonly FixtureCase[] = [
  {
    name: "flags an exact 12-digit string",
    fileName: "case.ts",
    content: 'export const accountId = "534827169203";\n',
    expectedMatchCount: 1,
  },
  {
    name: "flags a 12-digit string with a leading zero",
    fileName: "case.ts",
    content: 'export const accountId = "034827169203";\n',
    expectedMatchCount: 1,
  },
  {
    name: "ignores an 11-digit string",
    fileName: "case.ts",
    content: 'export const notAnAccountId = "12345678901";\n',
    expectedMatchCount: 0,
  },
  {
    name: "ignores a 13-digit string",
    fileName: "case.ts",
    content: 'export const notAnAccountId = "1234567890123";\n',
    expectedMatchCount: 0,
  },
  {
    name: "flags a 12-digit run embedded in a larger string",
    fileName: "case.ts",
    content: 'export const arn = "arn:aws:iam::534827169203:role/Example";\n',
    expectedMatchCount: 1,
  },
  {
    name: "flags a 12-digit numeric literal",
    fileName: "case.ts",
    content: "export const accountId = 534827169203;\n",
    expectedMatchCount: 1,
  },
  {
    name: "flags multiple 12-digit strings in one file",
    fileName: "case.ts",
    content: [
      'export const production = "534827169203";',
      'export const staging = "987654321098";',
      "",
    ].join("\n"),
    expectedMatchCount: 2,
  },
  {
    name: "flags a 12-digit JSX attribute string",
    fileName: "case.tsx",
    content: 'export const Example = () => <div data-account="534827169203" />;\n',
    expectedMatchCount: 1,
  },
  {
    name: "ignores AWS's own documentation placeholder account ID",
    fileName: "case.ts",
    content: 'export const example = "123456789012";\n',
    expectedMatchCount: 0,
  },
  {
    name: "ignores a repeated-digit placeholder account ID",
    fileName: "case.ts",
    content: 'export const example = "111111111111";\n',
    expectedMatchCount: 0,
  },
  {
    name: "ignores the documentation placeholder embedded in an example ARN",
    fileName: "case.ts",
    content: 'export const exampleArn = "arn:aws:iam::123456789012:role/Example";\n',
    expectedMatchCount: 0,
  },
  {
    name: "ignores a repeated-digit placeholder embedded in an example ARN",
    fileName: "case.ts",
    content: 'export const exampleArn = "arn:aws:iam::222222222222:role/Example";\n',
    expectedMatchCount: 0,
  },
];

const jsonCases: readonly FixtureCase[] = [
  {
    name: "flags an exact 12-digit string value",
    fileName: "case.json",
    content: '{\n  "accountId": "534827169203"\n}\n',
    expectedMatchCount: 1,
  },
  {
    name: "flags a 12-digit string value with a leading zero",
    fileName: "case.json",
    content: '{\n  "accountId": "034827169203"\n}\n',
    expectedMatchCount: 1,
  },
  {
    name: "ignores an 11-digit string value",
    fileName: "case.json",
    content: '{\n  "notAnAccountId": "12345678901"\n}\n',
    expectedMatchCount: 0,
  },
  {
    name: "ignores a 13-digit string value",
    fileName: "case.json",
    content: '{\n  "notAnAccountId": "1234567890123"\n}\n',
    expectedMatchCount: 0,
  },
  {
    name: "flags a bare 12-digit number value",
    fileName: "case.json",
    content: '{\n  "accountId": 534827169203\n}\n',
    expectedMatchCount: 1,
  },
  {
    name: "flags a 12-digit run embedded in a larger string value",
    fileName: "case.json",
    content: '{\n  "arn": "arn:aws:iam::534827169203:role/Example"\n}\n',
    expectedMatchCount: 1,
  },
  {
    name: "ignores AWS's own documentation placeholder account ID",
    fileName: "case.json",
    content: '{\n  "example": "123456789012"\n}\n',
    expectedMatchCount: 0,
  },
  {
    name: "ignores a repeated-digit placeholder account ID",
    fileName: "case.json",
    content: '{\n  "example": "111111111111"\n}\n',
    expectedMatchCount: 0,
  },
];

const cssCases: readonly FixtureCase[] = [
  {
    name: "flags an exact 12-digit string in a declaration value",
    fileName: "case.css",
    content: '.a::before {\n  content: "534827169203";\n}\n',
    expectedMatchCount: 1,
  },
  {
    name: "ignores an 11-digit string in a declaration value",
    fileName: "case.css",
    content: '.a::before {\n  content: "12345678901";\n}\n',
    expectedMatchCount: 0,
  },
  {
    name: "ignores a 13-digit string in a declaration value",
    fileName: "case.css",
    content: '.a::before {\n  content: "1234567890123";\n}\n',
    expectedMatchCount: 0,
  },
  {
    name: "flags a 12-digit run embedded in a larger declaration string",
    fileName: "case.css",
    content: '.a::before {\n  content: "arn:aws:iam::534827169203:role/Example";\n}\n',
    expectedMatchCount: 1,
  },
  {
    name: "ignores AWS's own documentation placeholder account ID",
    fileName: "case.css",
    content: '.a::before {\n  content: "123456789012";\n}\n',
    expectedMatchCount: 0,
  },
  {
    name: "ignores a repeated-digit placeholder account ID",
    fileName: "case.css",
    content: '.a::before {\n  content: "111111111111";\n}\n',
    expectedMatchCount: 0,
  },
];

const casesByLanguage: Readonly<Record<PluginLanguage, readonly FixtureCase[]>> = {
  javascript: javascriptCases,
  json: jsonCases,
  css: cssCases,
};

/** Returns the boundary and detection fixture cases for one target language. */
export function casesFor(language: PluginLanguage): readonly FixtureCase[] {
  return casesByLanguage[language];
}
