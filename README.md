# ekko.js

实验性的前端模板引擎


## 实现无逻辑的数据绑定

你想要放置内容的dom位置：
```html
    <div id="container"></div>
```

假设有一份数据：
```javascript
    var user = {
        name : "Tom",
        profile: {
            birthday : '1988-12-20'
        }
    }
```

创建模板一份模板文件：
```html
    <script type="text/html" id="template">
        <p>My name is {{ name }}, My birthday is {{ profile.birthday }}</p>
    </script>
```

引用ekko.js:
```javascript
    dom = document.getElementById('container');
    tpl = document.getElementById('template');
    ekko.render(dom, tpl, user);
```

输出为:
```javascript:
    <div id="container>
        <p>My name is Tom, My birthday is 1988-12-20</p>
    <div>
```

## 实现if else模板

语法:
````html
     <script type="text/html" id="template">
         ~if ( name == 'Tom' )
            <p>My name is {{ name }}, My birthday is {{ profile.birthday }}</p>
         ~
     </script>
```

支持逻辑分支:
```html
    <script type="text/html" id="template">
          ~if ( name == 'Jerry' )
             <p>I'm Jerry</p>
          ~else ~if ( name == 'Tom' )
             <p>I'm Tom</p>
          ~
    </script>
```

## 实现循环模板

有数组:
```javascript
    var list = [
        {
           name   : 'Tom',
           gender : 'male'
        },
        {
           name   : 'Jerry',
           gender : 'female'
        },
        {
           name   : 'Jim',
           gender : 'male'
        },
        {
           name   : 'Kenny',
           gender : 'female'
        },
        {
           name   : 'Geoge',
           gender : 'male'
        }
    ]
```

语法:
```html
    <script type="text/html" id="template">
          @for ( user in list )
             <p>Name: {{ user.name  }}, Gender: {{ user.gender }}</p>
          @
    </script>
```

支持相互嵌套
```html
    <script type="text/html" id="template">
          @for ( item in sequence )
          		<p>{{ item.name }} is a {{ item.gender }},
          			@for ( school in item.profile.school )
          			<span>{{ school }}</span>
          			@
          		</p>
          @
    </script>
```

支持计算赋值
```html
    <script type="text/html" id="template">
          <p>{{ (gender == 'male')? 'boy' : 'girl' }}</p>
    </script>
```