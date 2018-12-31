package info.doushen.ent.music.biz;

import info.doushen.common.utils.PageUtils;
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
    PageUtils pageAlbumList(Query query);

    /**
     * 保存专辑
     *
     * @param album
     * @return
     */
    int save(AlbumEntity album);

}
