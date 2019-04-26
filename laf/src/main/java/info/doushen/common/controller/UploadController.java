package info.doushen.common.controller;

import info.doushen.common.Result;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

/**
 * UploadController
 *
 * @author huangdou
 * @date 2018/12/25
 */
@Controller
public class UploadController {

    @Value("${laf.uploadPath}")
    private String uploadPath;
    @Value("${laf.imagePath}")
    private String imagePath;

    @ResponseBody
    @RequestMapping(value = "/upload/{dir}",method = RequestMethod.POST)
    public Result upload(@PathVariable("dir") String dir, @RequestParam("images") MultipartFile file) throws IOException {
        String pathname = "";
        String returnPath = "";
        if (!file.isEmpty()){

            dir = "/" + dir.replaceAll("_", "/") + "/";

            File uploadFile = new File(uploadPath + dir);
            if (!uploadFile.exists()){
                uploadFile.mkdirs();
            }
            //获取文件后缀名
            String end = FilenameUtils.getExtension(file.getOriginalFilename());

            String diskFileName = UUID.randomUUID() + "." +end; //目标文件的文件名
            pathname = uploadFile.getPath()+ "/" + diskFileName;

            returnPath = imagePath + dir + diskFileName;//这里是我自己做返回的字符串

            file.transferTo(new File(pathname));//文件转存
        }
        return Result.ok(returnPath);
    }

}
