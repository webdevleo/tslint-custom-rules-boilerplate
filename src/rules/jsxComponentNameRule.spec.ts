import { helper } from '../lintRunner';

const rule = 'jsx-component-name';
const fileName = 'ComponentName.tsx';

describe('jsx-component-name test', () => {

	it(`testing failure functional components without name`, () => {
		const src = 'export default (): React.FC => null;';
		const result = helper({
			src, rule, fileName
		});
		expect(result.errorCount).toBe(1);
	});

	it(`testing failure functional components with React.FC type and null body`, () => {
		const src = 'const Test: React.FC = () => null;';
		const result = helper({src, rule, fileName});
		expect(result.errorCount).toBe(1);
	});

	it(`testing failure functional components with FC type and null body`, () => {
		const src = 'const Test: FC = () => null;';
		const result = helper({src, rule, fileName});
		expect(result.errorCount).toBe(1);
	});

	it(`testing failure functional components with FC type, generic type and null body`, () => {
		const src = 'const Nothing: FC<IProps> = () => null;';
		const result = helper({src, rule: {
				name: rule,
				options: ['Example']
			}, fileName});
		expect(result.errorCount).toBe(1);
	});

	it(`testing success functional components with FC type, generic type and null body`, () => {
		const src = 'const CompExample: FC<IProps> = () => null;';
		const result = helper({src, rule: {
				name: rule,
				options: ['Example']
			}, fileName});
		expect(result.errorCount).toBe(0);
	});

	it(`testing failure functional components without types but JSX self closing tag`, () => {
		const src = 'const Test = () => <CustomElement/>';
		const result = helper({src, rule, fileName});

		expect(result.errorCount).toBe(1);
	});

	it(`testing failure functional components without types but JSX paired tags`, () => {
		const src = 'const Test = () => <div>Some text</div>;';
		const result = helper({src, rule, fileName});
		expect(result.errorCount).toBe(1);
	});

	it(`testing failure functional components without types but JSX self closing tag with attributes`, () => {
		const src = 'const Test = ({ id, className }) => (<div id={id} className={className}/>);';
		const result = helper({src, rule, fileName});
		expect(result.errorCount).toBe(1);
	});

	it(`testing failure functional components with types and JSX self closing tag with attributes`, () => {
		const src = `
			const Test: React.FC<{ id: number, className: string }> = ({ id, className }) => (
		      <div id={id} className={className}/>
		    );
		`;
		const result = helper({src, rule, fileName});
		expect(result.errorCount).toBe(1);
	});

	it(`testing success not JSX function`, () => {
		const src = 'const someUtil = () => null;';
		const result = helper({src, rule, fileName});
		expect(result.errorCount).toBe(0);
	});

	it(`testing success JSX function with correct prefix name`, () => {
		const src = 'const TestComponent = ({ id, className }) => (<div id={id} className={className}/>);';
		const result = helper({src, rule, fileName});
		expect(result.errorCount).toBe(0);
	});

	// it(`testing failure functional HOC components without types`, () => {
	// 	const src = `
	// 		import { useEffect } from 'react';
	// 		import { useDispatch } from 'react-redux';
	//
	// 		interface IProps {
	// 			children: any;
	// 		}
	//
	// 		export const MyComponent = ({ children }: IProps) => {
	// 			const dispatch = useDispatch();
	//
	// 			useEffect(() => {
	// 				dispatch({});
	// 			}, [dispatch]);
	//
	// 			return children;
	// 		};
	// 	`;
	//
	// 	const result = helper({src, rule, fileName });
	// 	expect(result.errorCount).toBe(1);
	// });

	it(`testing failure Class component`, () => {
		const src = `
			export class Test extends React.Component {
				render() {
					return null;
				}
			};
		`;

		const result = helper({src, rule, fileName});
		expect(result.errorCount).toBe(1);
	});

	it(`testing failure`, () => {
		const src = `
			export class Test extends React.PureComponent<IProps> {
				render() {
					return null;
				}
			};
		`;

		const result = helper({src, rule, fileName});
		expect(result.errorCount).toBe(1);
	});

	it(`testing success`, () => {
		const src = `
			export class TestComponent extends React.Component implements IComponent {
				render() {
					return null;
				}
			};
		`;

		const result = helper({src, rule, fileName});
		expect(result.errorCount).toBe(0);
	});

	it(`testing success`, () => {
		const src = `
			export class MyClass  {
				render() {
					return null;
				}
			};
		`;

		const result = helper({src, rule, fileName});
		expect(result.errorCount).toBe(0);
	});
});
