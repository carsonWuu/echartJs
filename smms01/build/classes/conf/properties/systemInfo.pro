########################################################
############系统文件路径，用于存放系统自动生成的文件#######
########################################################

#系统标识符
SYSTEMPK=SMMS

#系统根路径
ROOT_PATH=/SMMS

#系统生成权限文件的存放路径
#AUTHOR_FILE_PATH=/usr/project/SMMS/conf/author/
AUTHOR_FILE_PATH=D:\\Workspace\\SMMS\\SMMS\\SMMS\\conf\\author\\
#生成权限文件的编码策略    用TEST测试
AUTHOR_FILE_ENCODE=

#读取权限树的编码策略    用TEST测试
AUTHOR_TREE_ENCODE=


#报表模板存放路径(报表模板上传和读取的路径)
REPORTSUBTEMLET_FILE_PATH=/usr/project/SMMS/reporttemp/fa/

#临时URL地址(根据报表模板生成的临时文件，可以通过URL方式访问)
TEMP_FILE_URL=http://localhost:8080/SMMS/tempFiles/

#下载附件的目录配置,必须以文件分隔符结尾（附件上传和读取下载的路径）
AttachmentFileDir=/usr/project/SMMS/ExportFiles/

#附件下载的文件URL路径（不可用）
AttachmentFileUrl=http://localhost:8080/SMMS/ExportFiles/

#数据库类型(MYSQL/ORACLE)
DBType=MYSQL

#系统日志级别  1=debug   2=log     3=error
LogLevel=1

#系统日志输出文件
LogFile=D:\\SMMS\\LOGS\\SYSOUT.LOG
#HTTP转码设置
HTTP_INCODE=UTF8
HTTP_OUTCODE=GBK

#AC日志目录
AC_LOG_PATH=/home/netmonitor/action/
AC_LOG_KEY_PATH=/home/netmonitor/keyword/
#AC日志备份目录
AC_LOG_BACKUP_PATH=/home/netmonitor/backup/

#AF日志目录
AF_LOG_FILE=/var/log/sangfor_log/sangfor_sis_log

#AF日志错误信息的文件名称
AF_LOG_ERR=sangfor_sis_log
#AF日志错误信息的文件的后缀名
AF_LOG_FORMAT=.err