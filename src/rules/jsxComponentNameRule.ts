import * as Lint from 'tslint';
import * as ts from 'typescript';
import { isJSXLikeComponent, getComponentName } from "../utils";

const ALLOWED_PREFIXES = ['Component', 'Page', 'HOC'];

export class Rule extends Lint.Rules.AbstractRule {
    static FAILURE_STRING = `Component name should end with one of the following words: ${ALLOWED_PREFIXES.join(', ')}`;
    static ALLOWED_PREFIXES = ALLOWED_PREFIXES;

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<void>) {
    function cb(node: ts.FunctionTypeNode): void {
        if (node.kind >= ts.SyntaxKind.FirstTypeNode && node.kind <= ts.SyntaxKind.LastTypeNode) {
            return;
        }

        if(isJSXLikeComponent(node)) {
            const name = getComponentName(node);

            const is_name_correct = Rule.ALLOWED_PREFIXES.some(prefix => name.endsWith(prefix));

            if(!is_name_correct) {
                ctx.addFailureAt(node.getStart(), node.getEnd() - node.getStart(), Rule.FAILURE_STRING);
            }

            return;
        }

        return ts.forEachChild(node, cb);
    }

    return ts.forEachChild(ctx.sourceFile, cb);
}

