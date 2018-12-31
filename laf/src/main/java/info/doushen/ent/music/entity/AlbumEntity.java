package info.doushen.ent.music.entity;

import info.doushen.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * AlbumEntity
 *
 * @author huangdou
 * @date 2018/12/29
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class AlbumEntity extends BaseEntity {

    /** 专辑名 */
    private String name;
    /** 歌手 */
    private int singerId;
    /** 发行日期 */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date issueDate;
    /** 语言 */
    private String language;
    /** 类型 */
    private String type;
    /** 风格 */
    private String style;
    /** 封面 */
    private String cover;

}
