/*
 * 
 * @Copyright Qianchen
 * https://github.com/iniaks/ekko
 * 
 */

var ekko = (function() {

	//匹配双括号内的变量正则
	var EXP_VARIABLE = /\{\{(.+?)\}\}/g;
	//去除空格
	var EXP_TRIM     = /(^\s+)|(\s+$)/g;
	//去除换行
	var EXP_ENTER    = /[\r\n]/g;
	//判断语句
	var EXP_IF       = /^~if*\s\((.+?)\)(.+?)~/;

	function iflogic(content, data) {

		var result;

		console.log(content.split('else'));

		var _content = content.split('else');

		for (var i=0; i < _content.length; i++) {

			var done = false;

			if ( i == _content.length-1 ) {
				result = plaintxt( _content[i].replace('~', '').replace(EXP_TRIM, ''), data )
			} else {
				var _temp = _content[i].replace(EXP_IF, function(source, condition, domTemplate) {
					var _condition = new Function('return(' + condition + ')').apply(data);

					if ( _condition ) {
						result = plaintxt( domTemplate.replace(EXP_TRIM, ''), data );
						done = true;
					}
				})

				if (done) break;
			}
		}

		return result;
	} 


	//对无逻辑模板的渲染
	function plaintxt(content, data) {
		//匹配变量内容，通过属性访问数据源
		var _transfer = content.replace( EXP_VARIABLE, function(source, prop) {
			//去除属性值的空格
			var _temp   = prop.replace(EXP_TRIM, '');
			//根据点号分割，获得多层属性值
			var _prop   = _temp.split('.');
			//初始化数据源
			var _result = data;
			//遍历多层属性访问到最终属性值
			for (var i = 0; i < _prop.length; i++) {
				_result = _result[ _prop[i] ];
			}

			return _result	
		})

		return _transfer;
	}

	var render = function(dom, template, data) {
		try {
			//提取模板内容,去除回车和空格
			var template = template.innerHTML.replace(EXP_TRIM, '').replace(EXP_ENTER, '');
			
			dom.innerHTML = iflogic(template, data);

		} catch(err) {
			//抛出错误
			throw(err)
		}
	}

	return {
		render : render
	}

})()