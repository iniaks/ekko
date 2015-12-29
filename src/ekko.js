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

	var render = function(dom, template, data) {
		try {
			//提取模板内容
			
			var template = template.innerHTML;

			//匹配变量内容，通过属性访问数据源
			var _transfer = template.replace( EXP_VARIABLE, function(source, prop) {
				//去除空格
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

			dom.innerHTML = _transfer;

		} catch(err) {
			//抛出错误
			throw(err)
		}
	}

	return {
		render : render
	}

})()