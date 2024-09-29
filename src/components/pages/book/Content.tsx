import { ChapterSearch } from '@/app/api/book/search/route';
import { Code } from '@/components/common/Code';
import parse, { convertNodeToElement } from 'react-html-parser';

export const Content = ({ book }: { book: ChapterSearch }) => {
	function NextToStringHTML(nodes: any[] | any): string {
		let result = '';
		if (
			nodes &&
			!Array.isArray(nodes) &&
			(nodes.type == 'text' ||
				nodes.type == 'comment' ||
				nodes.type == 'script')
		) {
			// if (nodes.data && nodes.data.includes('/n')) {
			// 	return '';
			// }
			if (nodes.type == 'comment') {
				return `<-- ${nodes.data} -->`;
			}
			return nodes.data;
		}
		if (
			nodes &&
			!Array.isArray(nodes) &&
			(nodes.type == 'tag' || nodes.type == 'style') &&
			nodes.next
		) {
			const tagOpen = `<${nodes.name} ${
				nodes.attribs
					? Object.entries(nodes.attribs).map(
							([key, value]) => `${key}${value ? `="${value}"` : ''} ~~`
					  )
					: ''
			}>`;
			const tagClose = `</${nodes.name}>`;

			result += `${tagOpen}${NextToStringHTML(nodes.next)}${tagClose}`;
		}
		return result;
	}

	function NodeToStringHTML(nodes: any[] | any): string {
		let result = '';
		if (
			nodes &&
			!Array.isArray(nodes) &&
			(nodes.type == 'text' ||
				nodes.type == 'comment' ||
				nodes.type == 'script')
		) {
			// if (nodes.data && nodes.data.includes('\n ')) {
			// 	return '';
			// }
			if (nodes.type == 'comment') {
				return `<-- ${nodes.data} -->`;
			}
			return nodes.data;
		}
		if (
			nodes &&
			!Array.isArray(nodes) &&
			(nodes.type == 'tag' || nodes.type == 'style') &&
			nodes.children
		) {
			const tagOpen = `<${nodes.name} ${
				nodes.attribs
					? Object.entries(nodes.attribs).map(
							([key, value]) => `${key}${value ? `="${value}"` : ''} ~~`
					  )
					: ''
			}>`;
			const tagClose = `</${nodes.name}>`;

			return `${tagOpen}${NodeToStringHTML(nodes.children)}${tagClose}${
				nodes.next ? NextToStringHTML(nodes.next) : ''
			}`;
		} else if (nodes) {
			if (!Array.isArray(nodes)) {
				result += NodeToStringHTML(nodes);
			} else {
				nodes.forEach((node: any) => {
					result += NodeToStringHTML(node);
				});
			}
		}
		return result;
	}

	return (
		<section className='content overflow-hidden'>
			{parse(book.content, {
				transform(node, index) {
					if (node.type == 'tag' && node.name == 'pre') {
						const chilren = node.children && node.children;

						let child = chilren ? NodeToStringHTML(chilren) : '';
						child = child.replaceAll('~~,', '');
						child = child.replaceAll('~~', '');
						child = child.replaceAll('\n  </dd>\n', '');

						return (
							<Code
								key={
									node.children && node.children.length != 0
										? node.children[0].data + node.type
										: node.type + index
								}
								language={(node.attribs && node.attribs.language) ?? 'js'}
								disable={
									(node.attribs && node.attribs.disable == 'true'
										? true
										: false) ?? false
								}
								compile={
									(node.attribs && node.attribs.compile === 'true'
										? true
										: false) ?? true
								}
								metadata={node.attribs && node.attribs.metadata}
							>
								{child}
							</Code>
						);
					}
				},
			})}
		</section>
	);
};
