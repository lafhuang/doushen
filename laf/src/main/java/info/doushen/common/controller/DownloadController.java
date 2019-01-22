package info.doushen.common.controller;

import info.doushen.common.enumeration.TemplateEnum;
import org.springframework.stereotype.Controller;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;

/**
 * DownloadController
 *
 * @author huangdou
 * @date 2019/1/19
 */
@Controller
public class DownloadController extends BaseController {

    @RequestMapping("/download/{type}")
    public String download(@PathVariable("type") String type, HttpServletResponse response) {

        String filePath = TemplateEnum.getPath(type);

        File file = new File(ClassUtils.getDefaultClassLoader().getResource("").getPath() + filePath);

        if (file.exists()) {

            String fileName = filePath.substring(filePath.lastIndexOf("/") + 1);

            try {
                fileName = URLEncoder.encode(fileName,"UTF-8");
            } catch (UnsupportedEncodingException e) {
                return null;
            }

            response.setContentType("application/force-download");// 设置强制下载不打开
            response.addHeader("Content-Disposition", "attachment;fileName=" + fileName);// 设置文件名

            byte[] buffer = new byte[1024];

            FileInputStream inputStream = null;
            BufferedInputStream bufferedInputStream = null;

            OutputStream output = null;

            try {
                inputStream = new FileInputStream(file);
                bufferedInputStream = new BufferedInputStream(inputStream);
                output = response.getOutputStream();
                int i = bufferedInputStream.read(buffer);
                while (i != -1) {
                    output.write(buffer, 0, i);
                    i = bufferedInputStream.read(buffer);
                }
                return null;
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (output != null) {
                    try {
                        output.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                if (bufferedInputStream != null) {
                    try {
                        bufferedInputStream.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                if (inputStream != null) {
                    try {
                        inputStream.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }

        return null;

    }

}
