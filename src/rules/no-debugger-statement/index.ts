import { createRule } from "../../utils";

type TOptions = [];

export type MessageIds = 'noDebuggerStatement';
export const RULE_NAME = 'no-debugger-statement';

export default createRule<TOptions, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "disallow to use debugger keyword",
            category: "Possible Errors",
            recommended: false,
        },
        fixable: "code",
        schema: [], // no options
        messages: {
            noDebuggerStatement: 'debugger keyword is not allowed',
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            DebuggerStatement(node) {
                context.report({
                    node,
                    messageId: "noDebuggerStatement",
                    fix: fixer => fixer.replaceText(node, '')
                });
            }
        };
    }
});
