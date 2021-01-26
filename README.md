# README

# テーブル設計

## Usersテーブル

| Column             | Type   | Option      | 
| ------------------ | ------ | ----------- | 
| name               | string | null: false | 
| email              | siring | null: false | 
| encrypted_password | string | null: false | 

## Association
has_many :themes
has_many :comments

## Themesテーブル

| Column            | Type       | Option           | 
| ----------------- | ---------- | -----------------| 
| main_theme        | string     | null: false      | 
| sub_theme_1       | string     | null: false      | 
| sub_theme_2       | string     | null: false      | 
| user_id           |references  | foreign_key:true | 

## Association
belongs_to :user
has_many :comments

## Commentsテーブル

| Column        | Type       | Option           | 
| ------------- | ---------- | ---------------- | 
| text          | string     | null: false      | 
| sub_theme_num | integer    | null: false      | 
| theme_id      | references | foreign_key:true | 
| user_id       | references | foreign_key:true | 

## Association
belongs_to :user
belongs_to :theme
