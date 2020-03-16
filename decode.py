import os
import sys
import json
import time
from PIL import Image

def splitImage( fileName, outPath ):
	# ���JSON�ļ�
	jsonPath = "%s.json"%fileName
	
	jsonPath = os.path.join( os.getcwd(), jsonPath )
	if not os.path.exists( jsonPath ):
		print "not find %s"%jsonPath
		return
	
	# ���PNG�ļ�
	pngPath = "%s.png"%fileName
	pngPath = os.path.join( os.getcwd(), pngPath )
	if not os.path.exists( pngPath ):
		print "not find %s"%pngPath
		return
	
	# ������Ŀ¼
	outPath = os.path.join( os.getcwd(), outPath )
	if not os.path.isdir( outPath ):
		os.mkdir( outPath )
		
	# ȡJSON�ļ�
	f = open( jsonPath, 'r' )
	fileStr = f.read()
	f.close()
	jsonData = json.loads( fileStr ) 
	
	#���image����
	SubTexture = jsonData.get( "SubTexture" )
	
	imgList = []
	
	#�򿪶���ļ�׼���и�
	# for img in images: 
	# 	pngPath = os.path.join( os.getcwd(), img ) 
	# 	pngPath = pngPath.replace("~","-")
	# 	if not os.path.exists( pngPath ):
	# 		print "not find %s"%pngPath 
	# 		break
	# 	imgList.append(Image.open( pngPath, 'r' ))
	
	imgList.append(Image.open( pngPath, 'r' ))
	
	# ��ʼ��ͼ
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
	# ȡ�ò���
	# if len( sys.argv ) < 2:
	# 	fileName = raw_input("Enter your fileName: ")
	# else:
	# 	fileName = sys.argv[1]
	# if len( sys.argv ) < 3:
	# 	outPath = raw_input("Enter your outPath: ")
	# else:
	# 	outPath = sys.argv[2]
		
	# # ��ʼ��ͼ
	# splitImage( fileName, outPath )

	
	splitImage( "dibutexiao_tex", "out" )
