package info.doushen.ent.music.biz;

import com.github.pagehelper.PageInfo;
import info.doushen.common.utils.Pager;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.entity.AlbumEntity;

import java.util.List;
import java.util.Map;

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
    PageInfo<AlbumEntity> pageAlbumList(Query query);

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
     * 导入歌手专辑
     *
     * @param createUser
     * @param albumList
     * @return
     */
    int saveSingerAlbum(int createUser, List<AlbumEntity> albumList);

    /**
     * 获取歌手专辑（歌手ID、专辑名）
     *
     * @param params
     * @return
     */
    AlbumEntity querySingerAlbum(Map<String, Object> params);

    /**
     * 删除专辑
     *
     * @param id
     * @return
     */
    int remove(int id);

    /**
     * 批量删除专辑
     *
     * @param albumIdList
     * @return
     */
    int batchRemove(int[] albumIdList);

}
