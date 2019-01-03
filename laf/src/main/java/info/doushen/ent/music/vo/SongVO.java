package info.doushen.ent.music.vo;

import info.doushen.common.vo.BaseVO;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * SongVO
 *
 * @author huangdou
 * @date 2019/1/3
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SongVO extends BaseVO {

    /** 歌曲名 */
    private String name;
    /** 专辑 */
    private int albumId;
    /** 专辑名 */
    private String albumName;
    /** 歌手 */
    private int singerId;
    /** 歌手名 */
    private String singerName;
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
