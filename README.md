# ekko
personal testing javascript engine


1. 实现无逻辑的数据绑定

你想要放置内容的dom位置：
```html
    <div id="container"></div>
```

假设有一份数据：
```javascript
    user = {
        name : "Tom",
        profile: {
            birthday : '1988-12-20'
        }
    }
```

创建模板一份模板文件：
```html
    <script type="text/html" id="template>
    My name is {{ name }}, My birthday is {{ profile.birthday }}
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

3. 实现循环模板

var EXP_CATEGORY = /(~if|@for)(.*)?/;