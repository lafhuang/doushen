package info.doushen.ent.music.biz;

import info.doushen.common.utils.PageUtils;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.entity.SongEntity;
import info.doushen.ent.music.vo.SongVO;

/**
 * SongService
 *
 * @author huangdou
 * @date 2019/1/1
 */
public interface SongService {

    /**
     * 分页获取歌曲列表
     *
     * @param query
     * @return
     */
    PageUtils pageSongList(Query query);

    /**
     * 保存歌曲
     *
     * @param song
     * @return
     */
    int save(SongEntity song);

    /**
     * 获取歌曲信息
     *
     * @param id
     * @return
     */
    SongVO get(int id);

    /**
     * 更新歌曲信息
     *
     * @param song
     * @return
     */
    int update(SongEntity song);

}
