import * as Lint from 'tslint';
import { Fix } from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
	static FAILURE_STRING = 'Use of debugger statements is forbidden.';

	public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
		// Call `applyWithFunction` with your callback function, `walk`.
		// This creates a `WalkContext<T>` and passes it in as an argument.
		// An optional 3rd parameter allows you to pass in a parsed version of `this.ruleArguments`. If used, it is not recommended to
		//     simply pass in `this.getOptions()`, but to parse it into a more useful object instead.
		return this.applyWithFunction(sourceFile, walk);
	}
}

// Here, the options object type is `void` (which is the default, so can be omitted) because we don't pass any options in this example.
function walk(ctx: Lint.WalkContext<void>) {
	// Recursively walk the AST starting with root node, `ctx.sourceFile`.
	// Call the function `cb` (defined below) for each child.
	return ts.forEachChild(ctx.sourceFile, cb);

	function cb(node: ts.Node): void {
		// Stop recursing further into the AST by returning early. Here, we ignore type nodes.
		if (node.kind >= ts.SyntaxKind.FirstTypeNode && node.kind <= ts.SyntaxKind.LastTypeNode) {
			return;
		}

		// Add failures using the `WalkContext<T>` object. Here, we add a failure if we find the null keyword.
		if (node.kind === ts.SyntaxKind.DebuggerStatement) {
			ctx.addFailureAt(node.getStart(), node.getEnd() - node.getStart(), Rule.FAILURE_STRING, fix(node));
		}

		// Continue recursion into the AST by calling function `cb` for every child of the current node.
		return ts.forEachChild(node, cb);
	}

	function fix(node: ts.Node): Fix {
		return new Lint.Replacement(node.pos, node.end, '');
	}
}