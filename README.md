# project-lvl2-s233 (hexlet)
<p>
<a href="https://codeclimate.com/github/codeclimate/codeclimate/maintainability"><img src="https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability" /></a>

<a href="https://codeclimate.com/github/codeclimate/codeclimate/test_coverage"><img src="https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage" /></a>
</p>

[![Build Status](https://travis-ci.org/YankinA/project-lvl2-s233.svg?branch=master)](https://travis-ci.org/YankinA/project-lvl2-s233)


<h1>Описание</h1>
<p>Утилита для поиска отличий в конфигурационных файлах.</p>

<h3>Возможности утилиты:</h3>

<ul>
<li>Поддержка форматов: json, yaml, ini</li>
<li>Генерация отчета в виде plain text, pretty и json</li>
<ul>

<h3>Пример использования:</h3>
<p>
$ gendiff --format plain first-config.ini second-config.ini<br><br>
Setting <b>common.setting2"</b> deleted.<br>
Setting <b>"common.setting4"</b> added with value <b>"blah blah".</b><br>
Setting <b>"group1.baz"</b> changed from <b>"bas"</b> to <b>"bars"</b>.<br>
Section <b>"group2"</b> deleted.<br>
</p>

###Установить:
```
npm i pr2-04.18
```




