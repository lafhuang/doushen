package info.doushen.ent.music.entity;

import info.doushen.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * SingerEntity
 *
 * @author huangdou
 * @date 2018-12-21
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SingerEntity extends BaseEntity {

    /** 姓名 */
    private String name;
    /** 英文名 */
    private String enName;
    /** 国家地区 */
    private String region;
    /** 首字母 */
    private String initial;
    /** 出生日期 */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthday;
    /** 艺人类型 */
    private String type;
    /** 星级 */
    private int star;
    /** 图片 */
    private String photo;

}
