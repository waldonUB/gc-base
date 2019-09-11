## 恢复本地文件
1. git reset --hard
2. git pull
## 分支
##### 新建分支
git checkout -b [branchName]
##### 切换分支
git checkout [branchName]
##### 删除分支
- git branch -d <BranchName>(本地分支)
- git push origin --delete <BranchName>(远程分支)
## 比较
### git status和 git diff的区别
https://blog.csdn.net/qq_32452623/article/details/78417609
- git status是查看哪些文件被修改了
- git diff可以查看某些或某个文件具体哪里被修改了，主要是比较工作区，暂存区和版本区的区别
### git stash 储藏
https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%82%A8%E8%97%8F%EF%BC%88Stashing%EF%BC%89
- 现在你想切换分支，但是你还不想提交你正在进行中的工作；所以你储藏这些变更。为了往堆栈推送一个新的储藏，只要运行 git stash
- 你的工作目录就干净了
- 这时，你可以方便地切换到其他分支工作；你的变更都保存在栈上。要查看现有的储藏，你可以使用 ==git stash list==

## 合并冲突
- 提交自己本地的修改，然后pull，就会要你合并冲突
- stash本地的修改，先让本地的工作区和暂存区保持和版本区的一致，这样这个分支干净了，可以直接pull下来，然后再用apply这个stash处理合并
- 如果本地修改的内容是不必要的，可以直接reset --hard让本地分支干净，相当于工具里面的revert，然后直接pull
- 先push到自己的分支上，然后切换回主分支，reset --hard然后本地主分支干净，然后再pull，完了之后merge自己分支的代码，处理完冲突再提交