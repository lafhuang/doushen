package info.doushen.common.enumeration;

import org.apache.commons.lang3.StringUtils;

/**
 * TemplateEnum
 *
 * @author huangdou
 * @date 2019/1/19
 */
public enum TemplateEnum {

    ALBUM("album", "/static/template/music/专辑.xlsx"), // 专辑模板
    SONG("song", "/static/template/music/歌曲.xlsx"); // 歌曲模板

    private String type;
    private String path;

    TemplateEnum(String type, String path) {
        this.type = type;
        this.path = path;
    }

    public String getType() {
        return type;
    }

    public String getPath() {
        return path;
    }

    public static String getPath(String type) {
        TemplateEnum[] templates = TemplateEnum.values();
        for (TemplateEnum template : templates) {
            if (StringUtils.equals(type, template.getType())) {
                return template.getPath();
            }
        }
        throw new IllegalArgumentException("未定义模板类型");
    }

}
