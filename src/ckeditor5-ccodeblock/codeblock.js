import CodeBlockEditing from './codeblockediting'
import CodeBlockUi from './codeblockui'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

export default class Codeblock extends Plugin{
    static get requires(){
        return [CodeBlockEditing, CodeBlockUi]
    }
}
