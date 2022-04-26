import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertInfoboxCommand from './insertinfoboxcommand';
export default class Infoboxediting extends Plugin {

    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertInfobox', new InsertInfoboxCommand( this.editor ) );
    }
    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'infobox', {
            isObject: true,
            allowWhere: '$block'
        } );

        schema.register('infoboxIcon',{
            isObject:true,
            allowIn:'infobox'
        })
        schema.register( 'infoboxText', {
            isLimit: true,
            allowIn: 'infobox',
            allowContentOf: '$block'
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'infoboxText' ) && childDefinition.name == 'infobox' ) {
                return false;
            }
        } );
    }
    _defineConverters() {
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            model: 'infobox',
            view: {
                name: 'div',
                classes: 'avr-info-box'
            }
        });
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'infobox',
            view: {
                name: 'div',
                classes: 'avr-info-box'
            }
        });
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'infobox',
            view: ( modelElement, { writer: viewWriter } ) => {
                const div = viewWriter.createContainerElement( 'div', { class: 'avr-info-box' } );
                return toWidget( div, viewWriter, { label: 'infobox' } );
            }
        } );
        conversion.for( 'upcast' ).elementToElement({
            model: ( viewElement, {writer: viewWriter} ) => {
                return viewWriter.createElement( 'infoboxIcon' );
            },
            view :{
                name:'div',
                classes:'avr-infobox-header'
            }
        });
        conversion.for( 'dataDowncast' ).elementToElement({
            model: 'infoboxIcon',
            view:(modelElement, { writer: viewWriter } ) => {
                const uiSpan = viewWriter.createUIElement( 'div', { class: 'avr-infobox-header' }, function( domDocument ) {
                    const domElement = this.toDomElement( domDocument );
                    domElement.innerHTML = `<div class="avr-infobox-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#375Af4" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                                                            </svg> </div><div class="avr-infobox-title">Note</div>`;
                    return domElement;
                } );
                return uiSpan;
            }
        });
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'infoboxIcon',
            view:(modelElement, { writer: viewWriter } ) => {
                const uiSpan = viewWriter.createUIElement( 'div', { class: 'avr-infobox-header' }, function( domDocument ) {
                    const domElement = this.toDomElement( domDocument );
                    domElement.innerHTML = `<div class="avr-infobox-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#375Af4" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                                                            </svg> </div><div class="avr-infobox-title">Note</div>`;

                    return domElement;
                });
                return uiSpan;
            }
        });

        conversion.for( 'upcast' ).elementToElement( {
            model: 'infoboxText',
            view: {
                name: 'div',
                classes: 'avr-info-box-text'
            }
        });
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'infoboxText',
            view: {
                name: 'div',
                classes: 'avr-info-box-text'
            }
        });
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'infoboxText',
            view: ( modelElement, { writer: viewWriter } ) => {

                const h1 = viewWriter.createEditableElement( 'div', { class: 'avr-info-box-text' } );
                return toWidgetEditable( h1, viewWriter );
            }
        });
    }
}
