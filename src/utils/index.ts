import * as ts from 'typescript';

const {
	VariableDeclaration,
	ClassDeclaration,
	FunctionExpression,
	ArrowFunction,
	JsxClosingElement,
	JsxSelfClosingElement,
	JsxElement,
	JsxExpression,
	JsxOpeningElement,
} = ts.SyntaxKind;

const PossibleJSXComponentsList = [VariableDeclaration, ClassDeclaration, FunctionExpression, ArrowFunction];
const JSXLikeSyntaxList = [JsxOpeningElement, JsxClosingElement, JsxSelfClosingElement, JsxElement, JsxExpression];

const ReactFCRegExp = /^(React.)?FC/;
const ReactComponentRegExp = /^(React.)?Component|PureComponent/;

export function getComponentName(node) {
	if ('name' in node && "escapedText" in node.name) {
		return node.name.escapedText;
	}

	if (!node.parent) {
		return '';
	}

	return getComponentName(node.parent);
}

export function hasJSXLikeSyntaxList(node) {
	if (JSXLikeSyntaxList.includes(node.kind)) {
		return true;
	}

	if (node.kind === ts.SyntaxKind.TypeReference) {
		const has_react_type_definition = ReactFCRegExp.test(node.getText());

		if (has_react_type_definition) {
			return true;
		}
	}

	if (node.kind === ts.SyntaxKind.ExpressionWithTypeArguments) {
		const has_react_type_definition = ReactComponentRegExp.test(node.getText());

		if (has_react_type_definition) {
			return true;
		}
	}

	return ts.forEachChild(node, hasJSXLikeSyntaxList);
}

export function isJSXLikeComponent(node: ts.Node) {
	return PossibleJSXComponentsList.includes(node.kind) && hasJSXLikeSyntaxList(node);
}