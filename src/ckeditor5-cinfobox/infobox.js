import InfoboxEditing from './infoboxediting'
import InfoboxUi from './infoboxui'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'

export default class Infobox extends Plugin{
    static get requires(){
        return [InfoboxEditing, InfoboxUi]
    }
}
