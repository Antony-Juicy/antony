## 1、指令总结

- 配置用户名： `git config --global user.name "username"`
- 配置邮箱：`git config --global user.email "xx@gmail.com"`
- 查看配置信息：`git config --list`
- 初始化生成本地仓库：`git init`
- 参看文件状态：`git status`
- 添加到暂存区：`git add .`
- 提交到本地仓库 ： `git commit -m message`
- 查看工作区和暂存区代码的区别：`git diff`
- 查看提交记录：`git log`
- 一个版本一行显示，方便查看 ：`git log --pretty=oneline`
- 查看当前远程仓库地址：`git remote show origin `
- 关联到远程仓库：`git remote add origin url`
- 推送本地master分支到远程master分支：`git push origin master`
- 创建一个开发分支并切换到新分支：`git checkout -b dev`
- 推送本地dev分支到远程dev分支：`git push origin dev`
- 推送本地master分支到远程dev分支：`git push origin master:dev`
- 从远程dev分支拉取到本地dev分支：`git pull origin dev`
- 将远程仓库克隆下载到本地：`git clone url`

##### 1.1、git的撤销

- 用暂存区文件覆盖工作区文件：`git checkout 文件名`
- 撤销提交到暂存区的文件：`git reset HEAD -- .`
- 撤销提交到本地仓库的文件：`git reset -soft HEAD^n`
- 回退到最近的一个版本 ：`git reset --hard HEAD`
- 将文件从暂存区删除：`git rm --cached 文件名(比如log文件)`
- 恢复git仓库中的指定版本 ：`git reset --hard 版本号`

##### 1.2、分支命令

- 查看本地所有分支：`git branch`
- 创建分支：`git branch 分支名称`（基于当前分支创建）
- 切换分支：`git checkout 分支名称`
- 创建并切换分支：`git checkout -b login`
- 合并分支：`git merge 被合并分支名称`
- 删除分支：`git branch -d 分支名称` （切换到其他分支进行删除）
- 强制删除：`git branch -D 分支名称`（分支没合并就需要强制删除）
- 删除远程分支：`git branch -d -r <branchname> `
- 查看远程分支：`git branch -r`
- 查看本地和远程的所有分支：`git branch -a`
- 重命名本地分支：`git branch -m <oldbranch> <newbranch> `
- 拉取远程仓库的某个分支到本地某个分支：`git pull origin 远程分支名:本地分支名`

##### 1.3、缓存区的使用  git stash

- 暂时保存更改：`git stash`
- 查看暂存的更改列表：`git stash list `
- 回复暂存的0版本到当前分支：`git stash apply stash@{0} `
- 恢复最近一次暂存的更改：`git stash pop`
- 删除第一个队列(暂存的0版本)：`git stash drop stash@{0}`

##### 1.4、新建项目关联远程仓库创建分支

- 新建本地仓库：`git init`
- 连接远程仓库：`git remote add origin url`（origin相当于是别名）
- `git add .`    `git commit -m message` 
- 将基础设置推送到main分支：`git push origin main`
- 在远程仓库main分支新建dev分支
- 新建本地dev分支：`git checkout dev `
- 将远程dev分支拉取到本地dev分支：`git pull origin dev`
- 基于本地dev分支新建本地自己的分支：`git branch liaoxiaona`
- 切换到本地自己的分支：`git checkout liaoxiaona`
- 在本地自己的分支开发
- 提交： `git add .`      `git commit -m message`      
- 切换到dev分支：`git checkout dev`  
- 拉取远程分支上的内容：`git pull`
- 在dev分支合并自己的分支：`git merge liaoxiaona`   （在这里解决冲突）
- 将本地dev分支推送到远程dev分支：`git push origin dev`
- 提交的时候输入 `git push -u origin dev`（写了-u，系统就会帮你记下仓库地址和分支名称） 下次提交到同一个分支就只需要git push  

提交的时候还可以

- 在自己分支：`git commit -m`
- 切换到dev：`git pull` 拉取远程更新代码
- 切回自己分支：`git merge dev`  合并dev分支上的代码（在这里解决冲突
- 解决完以后再切换到dev合并自己的分支：`git merge liaoxiaona`

##### 1.5、解决冲突

+ 把工作区的修改提交到栈区，目的是保存工作区的修改 `git stash`
+ 拉取远程分支上的代码并合并到本地分支，目的是消除冲突：`git pull`
+ 把保存在栈区的修改部分合并到最新的工作空间中：`git stash pop`

另一种方式

+ 查看冲突文件：`git status`
+ vscode打开冲突文件
+ 解决冲突
+ 提交：`git add .      git commit -m "message"`
+ 查看分支合并图：`git log -graph`



## git stash

git stash是把工作区修改的内容存储在栈区 

使用到它的情况：

（1）解决冲突文件时，可以先执行git stash，然后解决冲突

（2）遇到紧急开发任务但目前任务不能提交时，会先执行git stash，然后进行紧急任务的开发，然后通过git stash pop取出栈区的内容继续开发 

（3）切换分支时，当前工作空间内容不能提交时，会先执行git stash再进行分支切换

### 分支提交历史记录

+ 查看当前分支前number个详细的提交历史记录：`git log -number`
+ 一个版本一行显示（简化的提交信息），方便查看 ：`git log --pretty=oneline `
+ 查看所有分支前number个简化的提交历史记录：`git reflog -number`



面试题：

### git gitHub gitLab 三者之间的区别以及联系

1、git是一个版本控制系统。

​	版本控制是一种用于记录一个或多个文件内容变化，方便我们查阅特定版本修订情况的系统。

早期出现的版本控制系统有：SVN、CVS等，它们是集中式版本控制系统，都有一个单一的集中管理的服务器，保存所有文件的修订版本，而协同合作的开发人员都通过客户端连接到这台服务器，取出最新的文件或者提交更新。而 Git 是分布式版本控制系统。

2、集中式和分布式版本控制系统的区别： 

(1).分布式版本控制系统下的本地仓库包含代码库还有历史库，在本地就可以查看版本历史 

(2).集中式版本控制系统下的历史仓库是存在于中央仓库，每次对比与提交代码都必须连接到中央仓库

(3).多人开发时，如果充当中央仓库的Git仓库挂掉了，任何一个开发者都可以随时创建一个新的中央仓库然后同步就可以恢复中央仓库 

GitLab可以在上面创建私人的免费仓库。

GitLab 让开发团队对他们的代码仓库拥有更多的控制，相比较 GitHub , 它有不少特色：

(1) 允许免费设置仓库权限；

(2) 允许用户选择分享一个 project 的部分代码；

(3) 允许用户设置 project 的获取权限，进一步提升安全性；

(4) 可以设置获取到团队整体的改进进度；

(5) 通过 innersourcing 让不在权限范围内的人访问不到该资源；

所以，从代码的私有性上来看，GitLab 是一个更好的选择。但是对于开源项目而言，GitHub 依然是代码托管的首选。

### git 和 svn 的区别

GIT是分布式版本控制系统，SVN是集中式版本控制系统。 

分布式区别于集中式在于：每个节点的地位都是平等，拥有自己的版本库，在没有网络的情况下，对工作空间内代码的修改可以提交到本地仓库，此时的本地仓库相当于集中式的远程仓库，可以基于本地仓库进行提交、撤销等常规操作，从而方便日常开发。

| git                                      | svn                                  |
| ---------------------------------------- | ------------------------------------ |
| 分布式版本控制                           | 集中式版本控制                       |
| 把内容按数据方式存储                     | 把内容按文件存储                     |
| 可以公用，可以分享                       | 公司内部才能访问，网外不方便访问     |
| 不依赖中央服务器，服务器有问题也不受影响 | 依赖服务器，一旦服务器有问题就会影响 |
| 没有全局的版本号                         | svn有                                |

### git fetch和git merge和git pull的区别

+ `git pull` 则是将远程主机的最新内容拉下来后直接合并，即：`git pull = git fetch + git merge`，这样可能会产生冲突，需要手动解决。

```js
git pull = git fetch + git merge FETCH_HEAD 

git pull --rebase =  git fetch + git rebase FETCH_HEAD 
```

正常的解决冲突过程是

1，git add .

2，git commit -m "..." 

3，git push时因为本地仓库代码与远程仓代码有冲突，所以接下来

4，git pull拉取远程代码，而冲突需要手动解决

5，解决好后重新进行git add . git commit -m".." git push

而git pull 这一步如果加上了 --rebase的选项，那么第5步操作将变成如下

git add .

git rebase --continue

git push

所以git pull --rebase用在合并代码的时候其作用就是在一个随机创建的分支上处理冲突，避免了直接污染原来的分区

+ `git fetch`是将远程主机的最新内容拉到本地，不会自动merge 

  它会从所需的分支中提取所有新提交，并将其存储在本地存储库中的新分支中。 

  用户在检查了以后决定是否合并到工作本机分支中。



分支

- master   用于发布版本（专人负责）----->  改成了main
- dev    开发分支
- release    未测试的正式版本，这里的代码来自dev分支，在发版本的日子就会把dev分支里面的代码合并到release里面来，release给测试团队去测试，测试完了再合并到master
- hotfix：紧急bug修复分支；版本已经上到了正式环境，发现了紧急bug，直接把紧急bug的代码在hotfix上面修复，修复完以后直接上线
- 个人分支：本地分支

git remote add 自定义别名（一般为origin） 仓库地址 改了以后提交就变成了 origin就代表远程仓库 git push origin master:master  //把本地的master分支推送到远程的master分支，名字一样可以简写只写一个 git push origin master:dev //把本地的master分支推送到远程的dev分支  提交的时候输入 git push -u origin master（写了-u，系统就会帮你记下仓库地址和分支名称） 下次提交到同一个分支就只需要git push  git pull origin master:dev //把远程的master拉取到本地的dev  git push reset git rest --hard commitID   （通过提交ID 指定恢复哪一个版本的项目状态） git log 查看提交日志，后面会跟着commitID git log --pretty=oneline 一个版本一行显示，方便查看 

工作区-----git add----->暂存区-------git commit------->仓库

\+ git reset --hard “”   ：三个区的代码都会进行版本回退

\+ git reset “”  ：暂存区和仓库回退，工作区代码不会修改

\+ git reset --soft “” ：只回退仓库代码版本

\+ git reset HEAD^ ：应用场景，git add.把代码存到暂存区以后想退回，

HEAD可以理解为最新版本，一个^代表上一个版本，两个^代表上两个版本，以此类推……HEAD -10上十个版本，不建议使用

svn：集中式

专业术语

mr

版本号

