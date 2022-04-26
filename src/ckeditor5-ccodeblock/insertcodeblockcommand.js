// simplebox/insertsimpleboxcommand.js

import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertCodeblockCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createCodeBlock( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'codeblock' );

        this.isEnabled = allowedIn !== null;
    }
}

function createCodeBlock( writer ) {
    const codeblock = writer.createElement( 'codeblock' );
    const codeblockText = writer.createElement( 'codeblockText' );
    const codeblockButton = writer.createElement('codeblockButton');

    writer.append( codeblockButton, codeblock );
    writer.append(codeblockText, codeblock);

    return codeblock;
}
