package info.doushen.ent.music.mapper;

import info.doushen.common.utils.Query;
import info.doushen.ent.music.entity.AlbumEntity;

import java.util.List;
import java.util.Map;

/**
 * AlbumMapper
 *
 * @author huangdou
 * @date 2018/12/29
 */
public interface AlbumMapper {

    /**
     * 获取专辑记录数
     *
     * @param query
     * @return
     */
    int count(Query query);

    /**
     * 获取专辑列表
     *
     * @param query
     * @return
     */
    List<AlbumEntity> list(Query query);

    /**
     * 保存专辑
     *
     * @param album
     * @return
     */
    int save(AlbumEntity album);

    /**
     * 获取专辑信息
     *
     * @param albumId
     * @return
     */
    AlbumEntity get(int albumId);

    /**
     * 更新专辑
     *
     * @param album
     * @return
     */
    int update(AlbumEntity album);

    /**
     * 获取歌手专辑（歌手ID、专辑名）
     *
     * @param params
     * @return
     */
    AlbumEntity querySingerAlbum(Map<String, Object> params);

}