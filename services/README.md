# Todo List Backend Services

这是一个基于Node.js和Express的后端服务项目，为Todo List前端应用提供API接口。

## 技术栈

- Node.js
- Express.js
- MySQL
- JWT
- bcryptjs

## 安装

1. 安装依赖

```bash
npm install
```

2. 配置环境变量

复制 `.env` 文件并修改配置：

```bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=todolist
JWT_SECRET=your_jwt_secret_key_here
```

3. 初始化数据库

```bash
node init_db.js
```

## 运行

### 开发模式

```bash
npm run dev
```

### 生产模式

```bash
npm start
```

## API接口

### 认证接口

#### 注册

**POST** `/api/auth/register`

参数：
```json
{
  "phone": "13800138000",
  "password": "123456"
}
```

#### 登录

**POST** `/api/auth/login`

参数：
```json
{
  "phone": "13800138000",
  "password": "123456"
}
```

#### 获取用户信息

**GET** `/api/auth/user`

需要在请求头中携带Authorization：
```
Authorization: Bearer <token>
```

### 待办事项接口

#### 获取所有待办事项

**GET** `/api/todos`

需要在请求头中携带Authorization：
```
Authorization: Bearer <token>
```

#### 添加待办事项

**POST** `/api/todos`

需要在请求头中携带Authorization：
```
Authorization: Bearer <token>
```

参数：
```json
{
  "title": "待办标题",
  "desc": "待办描述",
  "quadrant": 1
}
```

#### 更新待办事项

**PUT** `/api/todos/:id`

需要在请求头中携带Authorization：
```
Authorization: Bearer <token>
```

参数：
```json
{
  "title": "更新后的标题",
  "desc": "更新后的描述",
  "quadrant": 2
}
```

#### 删除待办事项

**DELETE** `/api/todos/:id`

需要在请求头中携带Authorization：
```
Authorization: Bearer <token>
```

## 数据库结构

### users表

| 字段名       | 类型         | 说明         |
|--------------|--------------|--------------|
| id           | INT          | 主键，自增   |
| phone        | VARCHAR(11)  | 手机号，唯一 |
| password     | VARCHAR(255) | 密码（哈希） |
| created_at   | TIMESTAMP    | 创建时间     |
| updated_at   | TIMESTAMP    | 更新时间     |

### todos表

| 字段名       | 类型         | 说明         |
|--------------|--------------|--------------|
| id           | INT          | 主键，自增   |
| user_id      | INT          | 用户ID（外键）| 
| title        | VARCHAR(255) | 待办标题     |
| desc         | TEXT         | 待办描述     |
| quadrant     | INT          | 优先级象限   |
| created_at   | TIMESTAMP    | 创建时间     |
| updated_at   | TIMESTAMP    | 更新时间     |
