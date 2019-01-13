package info.doushen.ent.music.controller;

import info.doushen.common.controller.BaseController;
import info.doushen.ent.music.constant.MusicConstant;
import info.doushen.ent.music.entity.AlbumEntity;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * MusicController
 *
 * @author huangdou
 * @date 2019/1/12
 */
@Controller
@RequestMapping("/ent/music")
public class MusicController extends BaseController {

    @Value("${laf.uploadPath}")
    private String uploadPath;
    @Value("${laf.imagePath}")
    private String imagePath;

    @ResponseBody
    @RequestMapping(value = "/parsing/{type}",method = RequestMethod.POST)
    public Map<String, Object> parsingTemplate(@PathVariable("type") String type, @RequestParam("template") MultipartFile file) {

        Map<String, Object> responseMap = new HashMap<>();

        if (!StringUtils.equals("album", type) && !StringUtils.equals("song", type)) {
            responseMap.put("code", "-1");
            responseMap.put("msg", "未知导入类型!");
            return responseMap;
        }

        if (file.isEmpty()){
            responseMap.put("code", "-1");
            responseMap.put("msg", "模板不能为空!");
            return responseMap;
        }

        try {
            File uploadFile = new File(uploadPath + "/template");
            if (!uploadFile.exists()){
                uploadFile.mkdirs();
            }
            //获取文件后缀名
            String end = FilenameUtils.getExtension(file.getOriginalFilename());
            if (!StringUtils.equals(end, "xlsx")) {
                responseMap.put("code", "-1");
                responseMap.put("msg", "模板格式错误!");
                return responseMap;
            }

            DateFormat df = new SimpleDateFormat("yyyyMMddHHmmssSSS");
            //图片名称 采取时间拼接随机数
            String name = df.format(new Date());
            Random r = new Random();
            for(int i = 0 ;i < 3 ;i++){
                name += r.nextInt(10);
            }
            String diskFileName = name + "." +end; //目标文件的文件名
            String pathname = uploadFile.getPath()+ "/" + diskFileName;

            file.transferTo(new File(pathname));//文件转存

            if (StringUtils.equals("album", type)) {
                responseMap = parsingAlbum(pathname);
            } else {
                responseMap = parsingSong(pathname);
            }

            File templateFile = new File(pathname);
            if (templateFile.exists() && templateFile.isFile()) {
                templateFile.delete();
            }

        } catch (Exception e) {
            responseMap.put("code", "-1");
            responseMap.put("msg", "模板解析失败!");
        }

        return responseMap;
    }

    Map<String, Object> parsingAlbum(String path) throws IOException, ParseException {

        Map<String, Object> resultMap = new HashMap<>();

        InputStream is = new FileInputStream(path);
        XSSFWorkbook workbook = new XSSFWorkbook(is);
        XSSFSheet sheet = workbook.getSheetAt(0);

        XSSFRow firstRow = sheet.getRow(0);
        // 校验第一行格式
        firstRow.getCell(0);

        // 1.专辑名 2.发行日期 3.语言 4.类型 5.风格 6.封面url
        XSSFCell albumNameCell = firstRow.getCell(0);
        String albumNameTitle = albumNameCell.getStringCellValue();
        if (!StringUtils.equals(albumNameTitle, MusicConstant.ALBUM_NAME)) {
            resultMap.put("code", "-1");
            resultMap.put("msg", "模板格式有误，请下载模板后重新上传!");
            return resultMap;
        }

        XSSFCell issueDateCell = firstRow.getCell(1);
        String issueDateTitle = issueDateCell.getStringCellValue();
        if (!StringUtils.equals(issueDateTitle, MusicConstant.ALBUM_ISSUE_DATE)) {
            resultMap.put("code", "-1");
            resultMap.put("msg", "模板格式有误，请下载模板后重新上传!");
            return resultMap;
        }

        XSSFCell languageCell = firstRow.getCell(2);
        String languageTitle = languageCell.getStringCellValue();
        if (!StringUtils.equals(languageTitle, MusicConstant.ALBUM_LANGUAGE)) {
            resultMap.put("code", "-1");
            resultMap.put("msg", "模板格式有误，请下载模板后重新上传!");
            return resultMap;
        }

        XSSFCell typeCell = firstRow.getCell(3);
        String typeTitle = typeCell.getStringCellValue();
        if (!StringUtils.equals(typeTitle, MusicConstant.ALBUM_TYPE)) {
            resultMap.put("code", "-1");
            resultMap.put("msg", "模板格式有误，请下载模板后重新上传!");
            return resultMap;
        }

        XSSFCell styleCell = firstRow.getCell(4);
        String styleTitle = styleCell.getStringCellValue();
        if (!StringUtils.equals(styleTitle, MusicConstant.ALBUM_STYLE)) {
            resultMap.put("code", "-1");
            resultMap.put("msg", "模板格式有误，请下载模板后重新上传!");
            return resultMap;
        }

        XSSFCell coverCell = firstRow.getCell(5);
        String coverTitle = coverCell.getStringCellValue();
        if (!StringUtils.equals(coverTitle, MusicConstant.ALBUM_COVER)) {
            resultMap.put("code", "-1");
            resultMap.put("msg", "模板格式有误，请下载模板后重新上传!");
            return resultMap;
        }

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

        List<AlbumEntity> albumList = new ArrayList();
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            XSSFRow albumRow = sheet.getRow(i);

            AlbumEntity album = new AlbumEntity();

            albumNameCell = albumRow.getCell(0);
            if (albumNameCell == null) {
                break;
            }
            String name = albumNameCell.getStringCellValue();
            album.setName(name);

            issueDateCell = albumRow.getCell(1);
            if (issueDateCell == null) {
                break;
            }
            String issuDate = issueDateCell.getStringCellValue();
            album.setIssueDate(format.parse(issuDate));

            languageCell = albumRow.getCell(2);
            if (languageCell == null) {
                break;
            }
            String language = languageCell.getStringCellValue();
            album.setLanguage(language);

            typeCell = albumRow.getCell(3);
            if (typeCell == null) {
                break;
            }
            String type = typeCell.getStringCellValue();
            album.setType(type);

            styleCell = albumRow.getCell(4);
            if (styleCell == null) {
                break;
            }
            String style = styleCell.getStringCellValue();
            album.setStyle(style);

            coverCell = albumRow.getCell(5);
            if (coverCell != null) {
                String coverUrl = coverCell.getStringCellValue();

                String cover = downloadImg(coverUrl);
                if (cover != null) {
                    album.setCover(cover);
                }
            }

            albumList.add(album);
        }

        resultMap.put("code", "0");
        resultMap.put("msg", "模板解析完成");
        resultMap.put("albumList", albumList);

        return resultMap;
    }

    Map<String, Object> parsingSong(String path) {

        Map<String, Object> resultMap = new HashMap<>();

        InputStream is = null;
        XSSFWorkbook workbook = null;
        try {
            is = new FileInputStream(path);
            workbook = new XSSFWorkbook(is);
            XSSFSheet sheet = workbook.getSheetAt(0);

            XSSFRow firstRow = sheet.getRow(0);
            // 校验第一行格式
            firstRow.getCell(0);

            // 1.歌曲名 2.专辑 3.音轨号 4.语言 5.时长 6.文件大小 7.音频类型
            XSSFCell songNameCell = firstRow.getCell(0);
            String songNameTitle = songNameCell.getStringCellValue();
            if (!StringUtils.equals(songNameTitle, MusicConstant.SONG_NAME)) {
                resultMap.put("code", "-1");
                resultMap.put("msg", "模板格式有误，请下载模板后重新上传!");
                return resultMap;
            }

            XSSFCell albumCell = firstRow.getCell(1);
            String albumTitle = albumCell.getStringCellValue();
            if (!StringUtils.equals(albumTitle, MusicConstant.SONG_ALBUM)) {
                resultMap.put("code", "-1");
                resultMap.put("msg", "模板格式有误，请下载模板后重新上传!");
                return resultMap;
            }

            XSSFCell trackCell = firstRow.getCell(2);
            String trackTitle = trackCell.getStringCellValue();
            if (!StringUtils.equals(trackTitle, MusicConstant.SONG_TRACK)) {
                resultMap.put("code", "-1");
                resultMap.put("msg", "模板格式有误，请下载模板后重新上传!");
                return resultMap;
            }

            XSSFCell languageCell = firstRow.getCell(3);
            String languageTitle = languageCell.getStringCellValue();
            if (!StringUtils.equals(languageTitle, MusicConstant.SONG_LANGUAGE)) {
                resultMap.put("code", "-1");
                resultMap.put("msg", "模板格式有误，请下载模板后重新上传!");
                return resultMap;
            }

            XSSFCell lengthCell = firstRow.getCell(4);
            String lengthTitle = lengthCell.getStringCellValue();
            if (!StringUtils.equals(lengthTitle, MusicConstant.SONG_LENGTH)) {
                resultMap.put("code", "-1");
                resultMap.put("msg", "模板格式有误，请下载模板后重新上传!");
                return resultMap;
            }

            XSSFCell sizeCell = firstRow.getCell(5);
            String sizeTitle = sizeCell.getStringCellValue();
            if (!StringUtils.equals(sizeTitle, MusicConstant.SONG_SIZE)) {
                resultMap.put("code", "-1");
                resultMap.put("msg", "模板格式有误，请下载模板后重新上传!");
                return resultMap;
            }

            XSSFCell audioTypeCell = firstRow.getCell(6);
            String audioTypeTitle = audioTypeCell.getStringCellValue();
            if (!StringUtils.equals(audioTypeTitle, MusicConstant.SONG_AUDIO_TYPE)) {
                resultMap.put("code", "-1");
                resultMap.put("msg", "模板格式有误，请下载模板后重新上传!");
                return resultMap;
            }

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {

            }

        } catch (IOException e) {
            resultMap.put("code", "-1");
            resultMap.put("msg", "模板解析失败");
        }

        return resultMap;
    }

    private String downloadImg(String coverUrl) throws IOException {

        URL url = new URL(coverUrl);
        DataInputStream inputStream = new DataInputStream(url.openStream());

        //获取文件后缀名
        String suffix = coverUrl.substring(coverUrl.lastIndexOf("."));

        DateFormat df = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        //图片名称 采取时间拼接随机数
        String name = df.format(new Date());
        Random r = new Random();
        for(int i = 0 ;i < 3 ;i++){
            name += r.nextInt(10);
        }

        FileOutputStream outputStream = new FileOutputStream(new File(uploadPath + "/music/album/" + name + suffix));
        ByteArrayOutputStream output = new ByteArrayOutputStream();

        byte[] buffer = new byte[1024];
        int length;

        while ((length = inputStream.read(buffer)) > 0) {
            output.write(buffer, 0, length);
        }
        outputStream.write(output.toByteArray());

        String cover = imagePath + "/music/album/" + name + suffix;

        if (inputStream != null) {
                inputStream.close();
        }
        if (outputStream != null) {
                outputStream.close();
        }
        if (output != null) {
                output.close();
        }

        return cover;
    }

}
