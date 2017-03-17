/**
 * hr
 * Created by peak on 16/8/20.
 */
export default {
    name: "hr",
    icon: "custom-icon hr",
    show: true,
    i18n: "hr",
    handler (editor) {
        editor.execCommand("insertHorizontalRule")
    },
    // init (editor) {
    //
    // },
    // destroyed(editor){
    //
    // },
}
