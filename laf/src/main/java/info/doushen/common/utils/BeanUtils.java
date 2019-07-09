package info.doushen.common.utils;

import com.google.common.collect.Lists;
import org.apache.commons.collections.CollectionUtils;
import org.dozer.DozerBeanMapper;
import org.dozer.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.*;

/**
 * BeanUtils
 *
 * @author huangdou
 * @date 2019/7/9
 */
public class BeanUtils {

    private static DozerBeanMapper dozer = new DozerBeanMapper();

    public static <T> T map(Object source, Class<T> destinationClass) {
        return dozer.map(source, destinationClass);
    }

    public static <T> List<T> mapList(Collection sourceList, Class<T> destinationClass) {
        List<T> destinationList = Lists.newArrayList();
        if (CollectionUtils.isEmpty(sourceList)) {
            return destinationList;
        }
        for (Object sourceObject : sourceList) {
            T destinationObject = dozer.map(sourceObject, destinationClass);
            destinationList.add(destinationObject);
        }
        return destinationList;
    }

    public static void copy(Object source, Object destinationObject) {
        dozer.map(source, destinationObject);
    }

//    public static <T> Map<String, T> toMap(Object target, boolean ignoreParent) {
//        return toMap(target, ignoreParent, false);
//    }
//
//    public static <T> Map<String, T> toMap(Object target,boolean ignoreParent, boolean ignoreEmptyValue) {
//        return toMap(target, ignoreParent, ignoreEmptyValue, new String[0]);
//    }
//
//    public static <T> Map<String, T> toMap(Object target, boolean ignoreParent, boolean ignoreEmptyValue, String... ignoreProperties) {
//        Map<String, T> map = new HashMap<>();
//        List<Field> fields = ReflectionUtils.getAccessibleFields(target.getClass(), ignoreParent);
//        for (Iterator<Field> it = fields.iterator(); it.hasNext();) {
//            Field field = it.next();
//            T value = null;
//            try {
//                value = (T) field.get(target);
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//            if (ignoreEmptyValue
//                    && ((value == null || value.toString().equals(""))
//                    || (value instanceof Collection && ((Collection<?>) value).isEmpty())
//                    || (value instanceof Map && ((Map<?,?>)value).isEmpty()))) {
//                continue;
//            }
//            boolean flag = true;
//            String key = field.getName();
//
//            for (String ignoreProperty:ignoreProperties) {
//                if (key.equals(ignoreProperty)) {
//                    flag = false;
//                    break;
//                }
//            }
//
//            if (flag) {
//                map.put(key, value);
//            }
//        }
//        return map;
//    }

}
