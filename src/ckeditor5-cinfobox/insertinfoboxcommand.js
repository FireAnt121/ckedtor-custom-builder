// simplebox/insertsimpleboxcommand.js

import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertInfoboxCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <simpleBox>*</simpleBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createInfobox( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'infobox' );

        this.isEnabled = allowedIn !== null;
    }
}

function createInfobox( writer ) {
    const infobox = writer.createElement( 'infobox' );
    const infoboxText = writer.createElement( 'infoboxText' );
    const infoBoxIcon = writer.createElement('infoboxIcon');

    writer.append(infoBoxIcon, infobox);
    writer.append( infoboxText, infobox );

    // There must be at least one paragraph for the description to be editable.
    // See https://github.com/ckeditor/ckeditor5/issues/1464.
    // writer.appendElement( 'paragraph', simpleBoxDescription );

    return infobox;
}
