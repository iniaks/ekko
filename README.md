# ekko
personal testing javascript engine


1. 实现无逻辑的数据绑定

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
    <script type="text/html" id="template>
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

2. 实现if else模板

语法:
````html
     <script type="text/html" id="template>
         ~if ( name == 'Tom' )
            <p>My name is {{ name }}, My birthday is {{ profile.birthday }}</p>
         ~
     </script>
```

支持逻辑分支:
```html
    <script type="text/html" id="template>
          ~if ( name == 'Jerry' )
             <p>I'm Jerry</p>
          ~else ~if ( name == 'Tom' )
             <p>I'm Tom</p>
          ~
    </script>
```

3. 实现循环模板

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
           gender : 'female
        },
        {
           name   : 'Geoge',
           gender : 'male'
        }
    ]
```

语法:
```html
    <script type="text/html" id="template>
          @for ( user in list )
             <p>Name: {{ user.name  }}, Gender: {{ user.gender }}</p>
          @
    </script>
```

支持相互嵌套