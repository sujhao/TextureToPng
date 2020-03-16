import os
import sys
import json
import time
from PIL import Image

def splitImage( fileName, outPath ):
	# 检查JSON文件
	jsonPath = "%s.json"%fileName
	
	jsonPath = os.path.join( os.getcwd(), jsonPath )
	if not os.path.exists( jsonPath ):
		print "not find %s"%jsonPath
		return
	
	# 检查PNG文件
	pngPath = "%s.png"%fileName
	pngPath = os.path.join( os.getcwd(), pngPath )
	if not os.path.exists( pngPath ):
		print "not find %s"%pngPath
		return
	
	# 检查输出目录
	outPath = os.path.join( os.getcwd(), outPath )
	if not os.path.isdir( outPath ):
		os.mkdir( outPath )
		
	# 取JSON文件
	f = open( jsonPath, 'r' )
	fileStr = f.read()
	f.close()
	jsonData = json.loads( fileStr ) 
	
	#检查image集合
	SubTexture = jsonData.get( "SubTexture" )
	
	imgList = []
	
	#打开多个文件准备切割
	# for img in images: 
	# 	pngPath = os.path.join( os.getcwd(), img ) 
	# 	pngPath = pngPath.replace("~","-")
	# 	if not os.path.exists( pngPath ):
	# 		print "not find %s"%pngPath 
	# 		break
	# 	imgList.append(Image.open( pngPath, 'r' ))
	
	imgList.append(Image.open( pngPath, 'r' ))
	
	# 开始切图
	lastIdx = 0
	frames = SubTexture
	for fn in frames:
		data = fn
		name = data.get( "name" ) + ".png"
		x = data.get("x")
		y = data.get("y")
		w = data.get("width")
		h = data.get("height")
		box = ( x, y, x+w, y+h )
		outFile = os.path.join( outPath, name )
		imgData = imgList[0].crop( box )
		imgData.save( outFile, 'png' )
	 
	
	
if __name__=='__main__':

	print "start run :"
	# 取得参数
	# if len( sys.argv ) < 2:
	# 	fileName = raw_input("Enter your fileName: ")
	# else:
	# 	fileName = sys.argv[1]
	# if len( sys.argv ) < 3:
	# 	outPath = raw_input("Enter your outPath: ")
	# else:
	# 	outPath = sys.argv[2]
		
	# # 开始切图
	# splitImage( fileName, outPath )

	
	splitImage( "dibutexiao_tex", "out" )
