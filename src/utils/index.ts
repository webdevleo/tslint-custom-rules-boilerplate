// import * as ts from 'typescript';
//
// export enum RuleType {
//     Functionality = 'functionality',
//     Maintainability = 'maintainability',
//     Style = 'style',
//     Typescript = 'typescript',
//     Formatting = 'formatting',
// }
//
// const {
// 	VariableDeclaration,
// 	ClassDeclaration,
// 	FunctionExpression,
// 	ArrowFunction,
// 	JsxClosingElement,
// 	JsxSelfClosingElement,
// 	JsxElement,
// 	JsxExpression,
// 	JsxOpeningElement,
//     ReturnStatement,
//     TypeReference,
//     ExpressionWithTypeArguments,
//     Identifier,
// } = ts.SyntaxKind;
//
// const PossibleJSXComponentsList = [VariableDeclaration, ClassDeclaration, FunctionExpression, ArrowFunction];
// const JSXLikeSyntaxList = [JsxOpeningElement, JsxClosingElement, JsxSelfClosingElement, JsxElement, JsxExpression];
//
// const ReactFCRegExp = /^(React.)?FC/;
// const ReactComponentRegExp = /^(React.)?Component|PureComponent/;
//
// export function getComponentName(node) {
// 	if ('name' in node && "escapedText" in node.name) {
// 		return node.name.escapedText;
// 	}
//
// 	if (!node.parent) {
// 		return '';
// 	}
//
// 	return getComponentName(node.parent);
// }
//
// export function hasJSXLikeSyntaxList(node) {
// 	if (JSXLikeSyntaxList.includes(node.kind)) {
// 		return true;
// 	}
//
// 	if (node.kind === TypeReference) {
// 		const has_react_type_definition = ReactFCRegExp.test(node.getText());
//
// 		if (has_react_type_definition) {
// 			return true;
// 		}
// 	}
//
// 	if (node.kind === ExpressionWithTypeArguments) {
// 		const has_react_type_definition = ReactComponentRegExp.test(node.getText());
//
// 		if (has_react_type_definition) {
// 			return true;
// 		}
// 	}
//
// 	return ts.forEachChild(node, hasJSXLikeSyntaxList);
// }
//
// export function isJSXLikeComponent(node: ts.Node) {
// 	return PossibleJSXComponentsList.includes(node.kind) && hasJSXLikeSyntaxList(node);
// }
//
// /**
//  * @todo function isn't work in non optimal way, and can check only limited type of HOC.
//  * It should be re-written to work in more optimal and strict way.
//  */
// export function isJSXHighOrderComponent(node: ts.Node) {
//     if(!isJSXLikeComponent(node)) {
//         return false;
//     }
//
//     function findChildrenIdentifier(node) {
//         if (node.kind === Identifier && node.getText() === 'children') {
//             return true;
//         }
//
//         return ts.forEachChild(node, findChildrenIdentifier);
//     }
//
//     function hasReturnChildren(node) {
//         if(node.kind === ReturnStatement) {
//             const hasChildren = ts.forEachChild(node, findChildrenIdentifier);
//
//             if(hasChildren) {
//                 return true;
//             }
//         }
//
//         return ts.forEachChild(node, hasReturnChildren);
//     }
//
//     return ts.forEachChild(node, hasReturnChildren);
// }

export * from './createRule';
export * from './rulesTester';
