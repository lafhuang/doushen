package info.doushen.ent.music.entity;

import info.doushen.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * SongEntity
 *
 * @author huangdou
 * @date 2019/1/1
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SongEntity extends BaseEntity {

    /** 歌曲名 */
    private String name;
    /** 专辑 */
    private int albumId;
    /** 音轨号 */
    private int trackNumber;
    /** 时长 */
    private String length;
    /** 文件大小 */
    private String size;
    /** 音频类型 */
    private String audioType;
    /** 歌词 */
    private String lyrics;

}
