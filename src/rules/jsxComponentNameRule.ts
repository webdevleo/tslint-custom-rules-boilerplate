import * as Lint from 'tslint';
import * as ts from 'typescript';
import { getComponentName, isJSXLikeComponent } from "../utils";

const ALLOWED_PREFIXES = ['Component', 'Page', 'HOC'];

export class Rule extends Lint.Rules.AbstractRule {
	static FAILURE_STRING = (strings, names: string[]) => (
		`Component name should end with one of the following words: ${names.join(', ')}`
	);

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		const {ruleArguments} = this.getOptions();
		return this.applyWithFunction<string[]>(sourceFile, walk, ruleArguments[0]);
	}
}

function walk(ctx: Lint.WalkContext<string[]>) {
	function cb(node: ts.FunctionTypeNode): void {
		if (node.kind >= ts.SyntaxKind.FirstTypeNode && node.kind <= ts.SyntaxKind.LastTypeNode) {
			return;
		}

		if (isJSXLikeComponent(node)) {
			const ACCEPTED_VALUE = ctx.options.length ? ctx.options : ALLOWED_PREFIXES;
			const name = getComponentName(node);

			const is_name_correct = ACCEPTED_VALUE.some(prefix => name.endsWith(prefix));

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

