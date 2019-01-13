package info.doushen.ent.music.biz;

import info.doushen.common.utils.PageUtils;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.entity.AlbumEntity;

import java.util.List;

/**
 * AlbumService
 *
 * @author huangdou
 * @date 2018/12/29
 */
public interface AlbumService {

    /**
     * 分页查询专辑
     *
     * @param query
     * @return
     */
    PageUtils pageAlbumList(Query query);

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
     * 导入歌手专辑
     *
     * @param createUser
     * @param albumList
     * @return
     */
    int saveSingerAlbum(int createUser, List<AlbumEntity> albumList);

}
