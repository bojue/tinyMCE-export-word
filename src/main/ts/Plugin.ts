import { Editor, TinyMCE } from 'tinymce';
import svg from "./word.svg"

declare const tinymce: TinyMCE;
function exportHTMLToWord(data) {
	// word样式定义
	const SHEET_STYLE = {
		table: 'border-collapse: collapse; border-spacing: 0;',
		border: 'border:1px solid #000000;',
	}

	const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
		xmlns:w='urn:schemas-microsoft-com:office:word'
		xmlns='http://www.w3.org/TR/REC-html40'>
		<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>`;
	const footer = '</body></html>';
	const data_replace_by_table = data && data.replace(/<table/g, `<table style="${SHEET_STYLE.table}" `)
	const data_replace_by_table_td = data_replace_by_table && data_replace_by_table.replace(/<td/g, `<td style="${SHEET_STYLE.border}" `)
	const printData = data_replace_by_table_td
	const sourceHTML = `${header}${printData}${footer}`;
	const source = `data:application/vnd.ms-word;charset=utf-8,${ encodeURIComponent(
		sourceHTML
	)}`;
	const fileDownload = document.createElement('a');
	document.body.appendChild(fileDownload);
	fileDownload.href = source;
	fileDownload.download = 'document.doc';
	fileDownload.click();
	document.body.removeChild(fileDownload);
}

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addIcon('exportword', `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1656662741699" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="2258" width="24" height="24"><defs><style type="text/css">@font-face { font-family: feedback-iconfont; src: url("//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff2?t=1630033759944") format("woff2"), url("//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff?t=1630033759944") format("woff"), url("//at.alicdn.com/t/font_1031158_u69w8yhxdu.ttf?t=1630033759944") format("truetype"); }
  </style></defs><path d="M832 256V192l128 91.392L832 384V320h-192V256h192zM192 320v384h576V447.936h128V832H64V192h512v128H192z m64.768 64h91.072l39.552 161.28 49.92-161.28H522.24l51.84 161.28L613.504 384H704l-90.432 256H529.92l-49.728-154.048L432.064 640H347.84L256.768 384z" p-id="2259" fill="#222f3e"/></svg>`)
  editor.ui.registry.addButton('exportword', {
    tooltip: '导出word',
    icon: 'exportword',
    onAction: () => {
      const data =  editor.getContent() || ''
      exportHTMLToWord(data)
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('exportword', setup);
};
