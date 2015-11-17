var marked = require("marked").setOptions({ langPrefix: 'language-', headerPrefix: '' })
var TerraformError = require("../../error").TerraformError
var marked = require("marked")
var renderer = new marked.Renderer()


var META_RE = /^([A-Za-z0-9_-]+:.*\n)+\n/m

// Removes meta data from markdown files.
function removeMetaData(s) {
    return s.replace(META_RE, '');
}

module.exports = function(fileContents, options){
  return {
    compile: function(){
      return function (locals){
        var markdown = fileContents.toString().replace(/^\uFEFF/, '')
        markdown = removeMetaData(markdown)
        return marked(markdown, {renderer: renderer})
      }
    },

    parseError: function(error){
      error.stack = fileContents.toString()
      return new TerraformError(error)
    }
  }
}