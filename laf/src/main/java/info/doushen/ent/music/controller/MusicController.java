package info.doushen.ent.music.controller;

import info.doushen.common.controller.BaseController;
import info.doushen.ent.music.constant.MusicConstant;
import info.doushen.ent.music.entity.AlbumEntity;
import info.doushen.ent.music.vo.SongVO;
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
import java.net.MalformedURLException;
import java.net.URL;
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

    public static final String RET_CODE_ERROR = "-1";
    public static final String RET_MSG_UNKOWN_FILE_TYPE = "未知导入类型!";
    public static final String RET_MSG_EMPTY_TEMPLATE = "模板不能为空!";
    public static final String RET_MSG_ERROR_TEMPLATE_TYPE = "模板格式错误!";
    public static final String RET_MSG_PARSE_ERROR = "模板解析失败!";
    public static final String RET_MSG_TEMPLATE_ERROR_FORMAT = "模板格式有误，请下载模板后重新上传!";
    public static final String RET_CODE_SUCCESS = "0";
    public static final String RET_MSG_SUCESS = "模板解析完成";

    @Value("${laf.uploadPath}")
    private String uploadPath;
    @Value("${laf.imagePath}")
    private String imagePath;

    @ResponseBody
    @RequestMapping(value = "/parsing/{type}",method = RequestMethod.POST)
    public Map<String, Object> parsingTemplate(@PathVariable("type") String type, @RequestParam("template") MultipartFile file) {

        Map<String, Object> responseMap;

        if (!StringUtils.equals("album", type) && !StringUtils.equals("song", type)) {
            return buildResultMap(RET_CODE_ERROR, RET_MSG_UNKOWN_FILE_TYPE);
        }

        if (file.isEmpty()){
            return buildResultMap(RET_CODE_ERROR, RET_MSG_EMPTY_TEMPLATE);
        }

        //获取文件后缀名
        String end = FilenameUtils.getExtension(file.getOriginalFilename());
        if (!StringUtils.equals(end, "xlsx")) {
            return buildResultMap(RET_CODE_ERROR, RET_MSG_ERROR_TEMPLATE_TYPE);
        }

        try {
            File uploadFile = new File(uploadPath + "/template");
            if (!uploadFile.exists()){
                uploadFile.mkdirs();
            }

            String diskFileName = UUID.randomUUID() + "." +end; //目标文件的文件名
            String pathname = uploadFile.getPath() + "/" + diskFileName;

            file.transferTo(new File(pathname));//文件转存

            if (StringUtils.equals("album", type)) {
                responseMap = parsingAlbum(pathname);
            } else if (StringUtils.equals("song", type)) {
                responseMap = parsingSong(pathname);
            } else {
                responseMap = buildResultMap(RET_CODE_ERROR, RET_MSG_UNKOWN_FILE_TYPE);
            }

        } catch (Exception e) {
            responseMap = buildResultMap(RET_CODE_ERROR, RET_MSG_PARSE_ERROR);
        }

        return responseMap;
    }

    /**
     * 解析专辑模板
     *
     * @param path
     * @return
     */
    Map<String, Object> parsingAlbum(String path) {
        XSSFSheet sheet = extractSheet(path, 0);

        XSSFRow firstRow = sheet.getRow(0);
        if (!verifyAlbumHead(firstRow)) {
            return buildResultMap(RET_CODE_ERROR, RET_MSG_TEMPLATE_ERROR_FORMAT);
        }

        List<AlbumEntity> albumList = extractAlbum(sheet);

        Map<String, Object> resultMap = buildResultMap(RET_CODE_SUCCESS, RET_MSG_SUCESS);
        resultMap.put("albumList", albumList);

        return resultMap;
    }

    /**
     * 读取专辑模板内容 组装album
     *
     * @param sheet
     * @return
     */
    private List<AlbumEntity> extractAlbum(XSSFSheet sheet) {
        XSSFCell albumNameCell;
        XSSFCell issueDateCell;
        XSSFCell languageCell;
        XSSFCell typeCell;
        XSSFCell styleCell;
        XSSFCell coverCell;
        List<AlbumEntity> albumList = new ArrayList();

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            XSSFRow albumRow = sheet.getRow(i);

            AlbumEntity album = new AlbumEntity();

            albumNameCell = albumRow.getCell(0);
            if (albumNameCell == null) {
                break;
            }
            String name = albumNameCell.getStringCellValue();
            if (StringUtils.isEmpty(name)) {
                break;
            }
            album.setName(name);

            issueDateCell = albumRow.getCell(1);
            if (issueDateCell == null) {
                break;
            }
            String issuDate = issueDateCell.getStringCellValue();
            if (StringUtils.isEmpty(issuDate)) {
                break;
            }
            try {
                album.setIssueDate(format.parse(issuDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }

            languageCell = albumRow.getCell(2);
            if (languageCell == null) {
                break;
            }
            String language = languageCell.getStringCellValue();
            if (StringUtils.isEmpty(language)) {
                break;
            }
            album.setLanguage(language);

            typeCell = albumRow.getCell(3);
            if (typeCell == null) {
                break;
            }
            String type = typeCell.getStringCellValue();
            if (StringUtils.isEmpty(type)) {
                break;
            }
            album.setType(type);

            styleCell = albumRow.getCell(4);
            if (styleCell == null) {
                break;
            }
            String style = styleCell.getStringCellValue();
            if (StringUtils.isEmpty(style)) {
                break;
            }
            album.setStyle(style);

            coverCell = albumRow.getCell(5);
            if (coverCell != null) {
                String coverUrl = coverCell.getStringCellValue();

                if (StringUtils.isNotEmpty(coverUrl)) {
                    String cover = downloadCover(coverUrl);
                    if (cover != null) {
                        album.setCover(cover);
                    }
                }

            }

            albumList.add(album);
        }
        return albumList;
    }

    /**
     * 校验专辑模板第一行内容
     *
     * @param firstRow
     * @return
     */
    private boolean verifyAlbumHead(XSSFRow firstRow) {
        // 校验第一行格式
        // 1.专辑名 2.发行日期 3.语言 4.类型 5.风格 6.封面url
        XSSFCell albumNameCell = firstRow.getCell(0);
        String albumNameTitle = albumNameCell.getStringCellValue();
        if (!StringUtils.equals(albumNameTitle, MusicConstant.ALBUM_NAME)) {
            return false;
        }

        XSSFCell issueDateCell = firstRow.getCell(1);
        String issueDateTitle = issueDateCell.getStringCellValue();
        if (!StringUtils.equals(issueDateTitle, MusicConstant.ALBUM_ISSUE_DATE)) {
            return false;
        }

        XSSFCell languageCell = firstRow.getCell(2);
        String languageTitle = languageCell.getStringCellValue();
        if (!StringUtils.equals(languageTitle, MusicConstant.ALBUM_LANGUAGE)) {
            return false;
        }

        XSSFCell typeCell = firstRow.getCell(3);
        String typeTitle = typeCell.getStringCellValue();
        if (!StringUtils.equals(typeTitle, MusicConstant.ALBUM_TYPE)) {
            return false;
        }

        XSSFCell styleCell = firstRow.getCell(4);
        String styleTitle = styleCell.getStringCellValue();
        if (!StringUtils.equals(styleTitle, MusicConstant.ALBUM_STYLE)) {
            return false;
        }

        XSSFCell coverCell = firstRow.getCell(5);
        String coverTitle = coverCell.getStringCellValue();
        if (!StringUtils.equals(coverTitle, MusicConstant.ALBUM_COVER)) {
            return false;
        }

        return true;
    }

    /**
     * build返回map
     *
     * @param code
     * @param msg
     * @return
     */
    private Map<String, Object> buildResultMap(String code, String msg) {
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("code", code);
        resultMap.put("msg", msg);
        return resultMap;
    }

    Map<String, Object> parsingSong(String path) {
        XSSFSheet sheet = extractSheet(path, 0);

        XSSFRow firstRow = sheet.getRow(0);

        if (!verifySongHead(firstRow)) {
            return buildResultMap(RET_CODE_ERROR, RET_MSG_TEMPLATE_ERROR_FORMAT);
        }

        List<SongVO> songList = extractSong(sheet);

        Map<String, Object> resultMap = buildResultMap(RET_CODE_SUCCESS, RET_MSG_SUCESS);
        resultMap.put("songList", songList);

        return resultMap;
    }

    /**
     * 读取模板内容 组装song
     *
     * @param sheet
     * @return
     */
    private List<SongVO> extractSong(XSSFSheet sheet) {
        XSSFCell songNameCell;
        XSSFCell albumCell;
        XSSFCell trackCell;
        XSSFCell languageCell;
        XSSFCell lengthCell;
        XSSFCell sizeCell;
        XSSFCell audioTypeCell;
        List<SongVO> songList = new ArrayList();
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            XSSFRow songRow = sheet.getRow(i);

            SongVO song = new SongVO();

            songNameCell = songRow.getCell(0);
            if (songNameCell == null) {
                break;
            }
            String name = songNameCell.getStringCellValue();
            if (StringUtils.isEmpty(name)) {
                break;
            }
            song.setName(name);

            albumCell = songRow.getCell(1);
            if (albumCell == null) {
                break;
            }
            String albumName = albumCell.getStringCellValue();
            if (StringUtils.isEmpty(albumName)) {
                break;
            }
            song.setAlbumName(albumName);

            trackCell = songRow.getCell(2);
            if (trackCell == null) {
                break;
            }
            Double trackNumber = trackCell.getNumericCellValue();
            song.setTrackNumber(trackNumber.intValue());

            languageCell = songRow.getCell(3);
            if (languageCell == null) {
                break;
            }
            String language = languageCell.getStringCellValue();
            if (StringUtils.isEmpty(language)) {
                break;
            }
            song.setLanguage(language);

            lengthCell = songRow.getCell(4);
            if (lengthCell == null) {
                break;
            }
            String length = lengthCell.getStringCellValue();
            if (StringUtils.isEmpty(length)) {
                break;
            }
            song.setLength(length);

            sizeCell = songRow.getCell(5);
            if (sizeCell == null) {
                break;
            }
            Double size = sizeCell.getNumericCellValue();
            song.setSize(String.valueOf(size));

            audioTypeCell = songRow.getCell(6);
            if (audioTypeCell == null) {
                break;
            }
            String audioType = audioTypeCell.getStringCellValue();
            if (StringUtils.isEmpty(audioType)) {
                break;
            }
            song.setAudioType(audioType);

            songList.add(song);
        }
        return songList;
    }

    /**
     * 校验歌曲模板第一行内容
     *
     * @param firstRow
     * @return
     */
    private boolean verifySongHead(XSSFRow firstRow) {
        // 校验第一行格式
        // 1.歌曲名 2.专辑 3.音轨号 4.语言 5.时长 6.文件大小 7.音频类型
        XSSFCell songNameCell = firstRow.getCell(0);
        String songNameTitle = songNameCell.getStringCellValue();
        if (!StringUtils.equals(songNameTitle, MusicConstant.SONG_NAME)) {
            return false;
        }

        XSSFCell albumCell = firstRow.getCell(1);
        String albumTitle = albumCell.getStringCellValue();
        if (!StringUtils.equals(albumTitle, MusicConstant.SONG_ALBUM)) {
            return false;
        }

        XSSFCell trackCell = firstRow.getCell(2);
        String trackTitle = trackCell.getStringCellValue();
        if (!StringUtils.equals(trackTitle, MusicConstant.SONG_TRACK)) {
            return false;
        }

        XSSFCell languageCell = firstRow.getCell(3);
        String languageTitle = languageCell.getStringCellValue();
        if (!StringUtils.equals(languageTitle, MusicConstant.SONG_LANGUAGE)) {
            return false;
        }

        XSSFCell lengthCell = firstRow.getCell(4);
        String lengthTitle = lengthCell.getStringCellValue();
        if (!StringUtils.equals(lengthTitle, MusicConstant.SONG_LENGTH)) {
            return false;
        }

        XSSFCell sizeCell = firstRow.getCell(5);
        String sizeTitle = sizeCell.getStringCellValue();
        if (!StringUtils.equals(sizeTitle, MusicConstant.SONG_SIZE)) {
            return false;
        }

        XSSFCell audioTypeCell = firstRow.getCell(6);
        String audioTypeTitle = audioTypeCell.getStringCellValue();
        if (!StringUtils.equals(audioTypeTitle, MusicConstant.SONG_AUDIO_TYPE)) {
            return false;
        }

        return true;
    }

    private String downloadCover(String coverUrl) {
        String cover = null;

        URL url;
        DataInputStream inputStream = null;
        FileOutputStream outputStream = null;
        ByteArrayOutputStream output = null;
        try {
            url = new URL(coverUrl);
            inputStream = new DataInputStream(url.openStream());

            //获取文件后缀名
            String suffix = coverUrl.substring(coverUrl.lastIndexOf("."));

            //图片名称 采取时间拼接随机数
            String name = UUID.randomUUID().toString();

            outputStream = new FileOutputStream(new File(uploadPath + "/music/album/" + name + suffix));
            output = new ByteArrayOutputStream();

            byte[] buffer = new byte[1024];
            int length;

            while ((length = inputStream.read(buffer)) > 0) {
                output.write(buffer, 0, length);
            }
            outputStream.write(output.toByteArray());

            cover = imagePath + "/music/album/" + name + suffix;
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (output != null) {
                try {
                    output.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return cover;
    }

    private XSSFSheet extractSheet(String path, int index) {
        InputStream is = null;
        XSSFWorkbook workbook;
        XSSFSheet sheet = null;

        try {
            is = new FileInputStream(path);
            workbook = new XSSFWorkbook(is);
            sheet = workbook.getSheetAt(index);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return sheet;
    }

}
