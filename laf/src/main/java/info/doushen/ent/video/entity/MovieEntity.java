package info.doushen.ent.video.entity;

import info.doushen.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * MovieEntity
 *
 * @Author: huangdou
 * @Date: 2019-02-19
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class MovieEntity extends BaseEntity {

    /** 片名 */
    private String name;
    /** 译名 */
    private String cnName;
    /** 源文件名 */
    private String sourceName;
    /** 海报 */
    private String poster;
    /** 文件大小 */
    private String size;
    /** 时长 */
    private String length;
    /** 上映日期 */
    private String releaseDate;
    /** 媒介 */
    private String medium;
    /** 编码 */
    private String encode;
    /** 音频编码 */
    private String audioEncode;
    /** 分辨率 */
    private String definition;
    /** 地区 */
    private String region;
    /** 类别 */
    private String movieType;
    /** 语言 */
    private String language;
    /** 中文字幕 */
    private String cnSubtitles;
    /** IMDB地址 */
    private String imdbUrl;
    /** IMDB评分 */
    private String imdbScore;
    /** 豆瓣地址 */
    private String doubanUrl;
    /** 豆瓣评分 */
    private String doubanScore;
    /** 简介 */
    private String discribe;

}
