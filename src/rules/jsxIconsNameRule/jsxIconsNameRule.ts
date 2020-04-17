import * as Lint from 'tslint';
import * as ts from 'typescript';
import { getComponentName, isJSXLikeComponent } from "../../utils";

const ALLOWED_PREFIXES = ['Icon'];

export class Rule extends Lint.Rules.AbstractRule {
	static FAILURE_STRING = (strings, names: string[]) => (
		`Icon components name should start with: ${names.join(', ')}\n`
	);

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		const {ruleArguments} = this.getOptions();
		return this.applyWithFunction<string[]>(sourceFile, walk, ruleArguments);
	}
}

function walk(ctx: Lint.WalkContext<string[]>) {
    const file_name = ctx.sourceFile.fileName.toLowerCase();
    const IS_AT_ICON_FOLDER = file_name.includes('icons');

    if(!IS_AT_ICON_FOLDER) {
        return;
    }

	function cb(node: ts.FunctionTypeNode): void {
		if (node.kind >= ts.SyntaxKind.FirstTypeNode && node.kind <= ts.SyntaxKind.LastTypeNode) {
			return;
		}

		if (isJSXLikeComponent(node)) {
		    console.log(ctx.options);
		    const HAS_FILLED_OPTIONS = ctx.options instanceof Array && ctx.options.length;
			const ACCEPTED_VALUE = HAS_FILLED_OPTIONS ? ctx.options : ALLOWED_PREFIXES;
			const name = getComponentName(node);

			const is_name_correct = ACCEPTED_VALUE.some(prefix => name.startsWith(prefix));

			if (!is_name_correct) {
                ctx.addFailureAt(
					node.getStart(),
					node.getEnd() - node.getStart(),
					Rule.FAILURE_STRING`${ACCEPTED_VALUE}`
				);
			}

			return;
		}

		return ts.forEachChild(node, cb);
	}

	return ts.forEachChild(ctx.sourceFile, cb);
}

