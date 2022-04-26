import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertCodeblockCommand from './insertcodeblockcommand';
export default class Codeblockediting extends Plugin {

    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertCodeblock', new InsertCodeblockCommand( this.editor ) );
    }
    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'codeblock', {
            isObject: true,
            allowWhere: '$block'
        } );

        schema.register('codeblockButton',{
            isObject:true,
            allowIn:'codeblock'
        })
        schema.register( 'codeblockText', {
            isLimit: true,
            allowIn: 'codeblock',
            allowContentOf: '$block'
        } );

        schema.addChildCheck( ( context, childDefinition ) => {
            if ( context.endsWith( 'codeblockText' ) && childDefinition.name == 'codeblock' ) {
                return false;
            }
        } );
    }
    _defineConverters() {
        const conversion = this.editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            model: 'codeblock',
            view: {
                name: 'code',
                classes: 'avr-code'
            }
        });
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'codeblock',
            view: {
                name: 'code',
                classes: 'avr-code'
            }
        });
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'codeblock',
            view: ( modelElement, { writer: viewWriter } ) => {
                const div = viewWriter.createContainerElement( 'code', { class: 'avr-code' } );
                return toWidget( div, viewWriter, { label: 'code' } );
            }
        } );
        conversion.for( 'upcast' ).elementToElement({
            model: ( viewElement, {writer: viewWriter} ) => {
                return viewWriter.createElement( 'codeblockButton' );
            },
            view :{
                name:'button',
                classes:'avr-code-button'
            }
        });
        conversion.for( 'dataDowncast' ).elementToElement({
            model: 'codeblockButton',
            view:(modelElement, { writer: viewWriter } ) => {
                return  viewWriter.createUIElement( 'button', { class: 'avr-code-button' }, function( domDocument ) {
                    const domElement = this.toDomElement( domDocument );
                    domElement.innerHTML = `<span class="avr-code-copied"> Copied! </span><svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M3.96346 15H13.3803C13.5446 15 13.7023 14.941 13.8185 14.8361C13.9347 14.7311 14 14.5887 14 14.4403V3.57948C14 3.43103 13.9347 3.28867 13.8185 3.18371C13.7023 3.07874 13.5446 3.01978 13.3803 3.01978H3.96346C3.7991 3.01978 3.64146 3.07874 3.52524 3.18371C3.40901 3.28867 3.34372 3.43103 3.34372 3.57948V14.4403C3.34372 14.5887 3.40901 14.7311 3.52524 14.8361C3.64146 14.941 3.7991 15 3.96346 15ZM12.7605 13.8806H4.58321V4.13918H12.7605V13.8806Z" fill="#2868F3"></path>
                                                                <path d="M0.619744 11.9802H3.96347C4.12783 11.9802 4.28547 11.9213 4.40169 11.8163C4.51791 11.7113 4.58321 11.569 4.58321 11.4205C4.58321 11.2721 4.51791 11.1297 4.40169 11.0248C4.28547 10.9198 4.12783 10.8608 3.96347 10.8608H1.23949V1.1194H9.41679V3.5791C9.41679 3.72755 9.48209 3.86991 9.59831 3.97487C9.71454 4.07984 9.87217 4.13881 10.0365 4.13881C10.2009 4.13881 10.3585 4.07984 10.4748 3.97487C10.591 3.86991 10.6563 3.72755 10.6563 3.5791V0.559702C10.6563 0.411259 10.591 0.268897 10.4748 0.163933C10.3585 0.0589684 10.2009 0 10.0365 0H0.619744C0.455378 0 0.297744 0.0589684 0.18152 0.163933C0.0652952 0.268897 9.53674e-07 0.411259 9.53674e-07 0.559702V11.4205C9.53674e-07 11.569 0.0652952 11.7113 0.18152 11.8163C0.297744 11.9213 0.455378 11.9802 0.619744 11.9802Z" fill="#2868F3"></path>
                                                            </svg>`;
                    return domElement;
                });
            }
        });
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'codeblockButton',
            view:(modelElement, { writer: viewWriter } ) => {
                return  viewWriter.createUIElement( 'button', { class: 'avr-code-button' }, function( domDocument ) {
                    const domElement = this.toDomElement( domDocument );
                    domElement.innerHTML = `<span class="avr-code-copied"> Copied! </span><svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M3.96346 15H13.3803C13.5446 15 13.7023 14.941 13.8185 14.8361C13.9347 14.7311 14 14.5887 14 14.4403V3.57948C14 3.43103 13.9347 3.28867 13.8185 3.18371C13.7023 3.07874 13.5446 3.01978 13.3803 3.01978H3.96346C3.7991 3.01978 3.64146 3.07874 3.52524 3.18371C3.40901 3.28867 3.34372 3.43103 3.34372 3.57948V14.4403C3.34372 14.5887 3.40901 14.7311 3.52524 14.8361C3.64146 14.941 3.7991 15 3.96346 15ZM12.7605 13.8806H4.58321V4.13918H12.7605V13.8806Z" fill="#2868F3"></path>
                                                                <path d="M0.619744 11.9802H3.96347C4.12783 11.9802 4.28547 11.9213 4.40169 11.8163C4.51791 11.7113 4.58321 11.569 4.58321 11.4205C4.58321 11.2721 4.51791 11.1297 4.40169 11.0248C4.28547 10.9198 4.12783 10.8608 3.96347 10.8608H1.23949V1.1194H9.41679V3.5791C9.41679 3.72755 9.48209 3.86991 9.59831 3.97487C9.71454 4.07984 9.87217 4.13881 10.0365 4.13881C10.2009 4.13881 10.3585 4.07984 10.4748 3.97487C10.591 3.86991 10.6563 3.72755 10.6563 3.5791V0.559702C10.6563 0.411259 10.591 0.268897 10.4748 0.163933C10.3585 0.0589684 10.2009 0 10.0365 0H0.619744C0.455378 0 0.297744 0.0589684 0.18152 0.163933C0.0652952 0.268897 9.53674e-07 0.411259 9.53674e-07 0.559702V11.4205C9.53674e-07 11.569 0.0652952 11.7113 0.18152 11.8163C0.297744 11.9213 0.455378 11.9802 0.619744 11.9802Z" fill="#2868F3"></path>
                                                            </svg>`;
                    return domElement;
                });
            }
        });

        conversion.for( 'upcast' ).elementToElement( {
            model: 'codeblockText',
            view: {
                name: 'pre',
                classes: 'avr-code-text'
            }
        });
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'codeblockText',
            view: {
                name: 'pre',
                classes: 'avr-code-text'
            }
        });
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'codeblockText',
            view: ( modelElement, { writer: viewWriter } ) => {

                const pre = viewWriter.createEditableElement( 'pre', { class: 'avr-code-text' } );
                return toWidgetEditable( pre, viewWriter );
            }
        });
    }
}
