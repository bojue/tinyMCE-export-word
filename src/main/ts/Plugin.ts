import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

const setup = (editor: Editor, url: string): void => {
  editor.ui.registry.addButton('export-word', {
    text: 'export-word button',
    onAction: () => {
      editor.setContent('<p>content added from export-word</p>');
    }
  });
};

export default (): void => {
  tinymce.PluginManager.add('export-word', setup);
};
