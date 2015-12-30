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
	var EXP_ENTER    = /[\r\n\t]/g;
	//判断语句
	var EXP_IF       = /^~if*\s\((.+?)\)(.+?)~/;
	//循环语句
	var EXP_FOR      = /^@for*\s\((.+?)\)(.+?)@/g;
	//判断模板类型
	var EXP_CATEGORY = /(~if|@for)(.*)?/;



	function renderAsOrder(content, data) {
		return (function() {
			return (function() {

				var _categroy = EXP_CATEGORY.exec(content);

				if (!_categroy) {
					return plaintxt(content.replace(EXP_TRIM, ''), data);
				} else {
					return content.replace(EXP_CATEGORY, function(renderpart, category) {
						switch (category) {
							case '@for':
								return forlogic(renderpart.replace(EXP_TRIM, ''), data);
								break;
							case '~if':
								return iflogic(content.replace(EXP_TRIM, ''), data);
								break;
						}
					})
				}
			})()
		})()

	}

	var ITEM_EXP = '';
	//对循环摸吧的渲染
	function forlogic(content, data) {
		return content.replace(EXP_FOR, function(source, loop, repeatItem) {
			//提取item关键字
			ITEM_EXP = new RegExp(loop.split('in')[0].replace(EXP_TRIM,''), 'g');

			//构建循环来重复模板
			var repeat = function(array_data) {
				var _temp_result = [];
				//依据数据依次渲染模板
				for ( var prop in array_data ) {
					_temp_result.push( renderAsOrder(repeatItem.replace(EXP_TRIM, ''), array_data[prop]) )
				}

				return _temp_result.join('');
			}

			return repeat(data)
		})
	}

	//对 if else 模板的渲染
	function iflogic(content, data) {

		var result;

		var _content = content.split('else');

		for (var i=0; i < _content.length; i++) {

			var done = false;

			if ( i == _content.length-1 ) {
				result = renderAsOrder( _content[i].replace('~', '').replace(EXP_TRIM, ''), data )
			} else {
				var _temp = _content[i].replace(EXP_IF, function(source, condition, domTemplate) {

					var _temp_condition = (ITEM_EXP != '')? condition.replace(ITEM_EXP, 'this') :'this.'+condition;

					var _condition = new Function('return(' + _temp_condition + ')').apply(data);

					if ( _condition ) {
						result = renderAsOrder( domTemplate.replace(EXP_TRIM, ''), data );
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
		var _transfer = content.replace( EXP_VARIABLE, function(source, prop, leftContent) {
			//去除属性值的空格
			var _temp   = prop.replace(EXP_TRIM, '');

			//根据点号分割，获得多层属性值
			var _prop   = _temp.split('.');
			//初始化数据源
			var _result = data;
			//遍历多层属性访问到最终属性值
			for (var i = 0; i < _prop.length; i++) {
				_result = ( _result[ _prop[i] ] )? _result[ _prop[i]] : _result ;
			}

			return _result	
		})

		return _transfer;
	}

	var render = function(dom, template, data) {
		try {
			//提取模板内容,去除回车和空格
			var template = template.innerHTML.replace(EXP_TRIM, '').replace(EXP_ENTER, '');
			
			dom.innerHTML = renderAsOrder(template, data);

		} catch(err) {
			//抛出错误
			throw(err)
		}
	}

	return {
		render : render
	}

})()