package info.doushen.system.biz;

import com.github.pagehelper.PageInfo;
import info.doushen.common.utils.Query;
import info.doushen.system.entity.DictEntity;

import java.util.List;
import java.util.Map;

/**
 * DictService
 *
 * @author huangdou
 * @date 2018/12/12
 */
public interface DictService {

    /**
     * 获取字典类型
     *
     * @return
     */
    List<DictEntity> listType();

    /**
     * 分页查询数据字典
     *
     * @param query
     * @return
     */
    PageInfo<DictEntity> pageDictList(Query query);

    /**
     * 保存数据字典
     *
     * @param dict
     * @return
     */
    int save(DictEntity dict);

    /**
     * 获取字典信息
     *
     * @param id
     * @return
     */
    DictEntity get(int id);

    /**
     * 删除数据字典
     *
     * @param id
     * @return
     */
    int remove(int id);

    /**
     * 批量删除数据字典
     *
     * @param dictIdList
     * @return
     */
    int batchremove(int[] dictIdList);

    /**
     * 更新字典
     *
     * @param dict
     * @return
     */
    int update(DictEntity dict);

    /**
     * 根据字典类型获取数据字典
     *
     * @param dictType
     * @return
     */
    List<DictEntity> queryDictByType(String dictType);

    /**
     * 获取所有数据字典
     *
     * @return
     */
    List<DictEntity> queryAll();

    /**
     * 数据字典显示内容
     *
     * @param params
     * @return
     */
    String dictDisplay(Map<String, Object> params);

    /**
     * 分组获取数据字典
     *
     * @param params
     * @return
     */
    Map<String, Object> dictGroup(Map<String, Object> params);

}
