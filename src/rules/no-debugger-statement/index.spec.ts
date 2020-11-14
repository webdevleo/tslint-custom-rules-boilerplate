import { RuleTester } from "../../utils";
import Rule, { RULE_NAME } from './index';

const ruleTester = new RuleTester({
    parser: '@typescript-eslint/parser',
});

ruleTester.run(RULE_NAME, Rule,{
    valid: [
        `console.log("There is no debugger keyword");`
    ],
    invalid: [
        {
            code: "debugger;",
            output: "",
            errors: [{ messageId: "noDebuggerStatement" }],
        }
    ]
});
